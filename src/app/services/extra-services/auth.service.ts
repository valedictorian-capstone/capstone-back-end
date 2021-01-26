import { Employee, Customer, Device } from '@models';
import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeRepository, CustomerRepository, DeviceRepository } from '@repositories';
import { EMPLOYEE_REPOSITORY, CUSTOMER_REPOSITORY, DEVICE_REPOSITORY, FIREBASE_SERVICE } from '@types';
import { EmployeeVM, CustomerCM, CustomerVM, DeviceCM, DeviceVM } from '@view-models';
import { compareSync, hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { environment } from 'src/environments/environment';
import { FirebaseService } from '.';
import { InvalidException } from '../../exceptions/invalid-exception';
import { uuid } from 'uuidv4';

@Injectable()
export class AuthService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) protected readonly employeeRepository: EmployeeRepository,
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @Inject(DEVICE_REPOSITORY) protected readonly deviceRepository: DeviceRepository,
    private readonly jwtService: JwtService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
  ) { }

  // Employee
  public readonly login = async (emailOrPhone: string, password: string,): Promise<any> => {
    return await this.validateEmployee(emailOrPhone, password).then(
      async (employee) => {
        console.log(employee)
        if (employee) {
          return {
            expiresIn: '24h',
            accessToken: this.generateJWT({
              fullname: employee.fullname,
              id: employee.id,
              email: employee.email,
              phone: employee.phone,
            } as any),
            devices: employee.devices,
            roles: employee.roles,
            fullname: employee.fullname,
            avatar: employee.avatar,
            id: employee.id,
          };
        }
      }
    )
  }
  public readonly refresh = async (requester: EmployeeVM, device?: DeviceCM) => {
    if (device?.id && !requester.devices.find((e) => e.id === device.id)) {
      const newDevice = await this.deviceRepository.useHTTP()
        .save({ ...device, employee: { id: requester.id }, customer: undefined } as any).then(async (data) => {
          return this.mapper.map(await this.deviceRepository.useHTTP().findOne({ id: data.id }, { relations: ['employee'] }), DeviceVM, Device);
        });
      requester.devices.push(newDevice);
      return requester;
    }
    return requester;
  }
  protected readonly generateJWT = (employee: EmployeeVM): string => {
    return sign({ employee }, 'vzicqoasanQhtZicTmeGsBpacNomny', {
      expiresIn: '24h',
      audience: employee.email,
      issuer: 'crm',
      subject: 'se20fa27'
    });
  }
  public readonly updatePassword = async (data: { old: string, password: string }, requester: EmployeeVM) => {
    const check = await this.employeeRepository.useHTTP().findOne({ id: requester.id })
      .then((res) => compareSync(data.old, res.passwordHash));
    if (check) {
      return await this.employeeRepository.useHTTP().save({ id: requester.id, passwordHash: hashSync(data.password, 10) } as any).then(() => null);
    } else {
      throw new InvalidException('Your old password is wrong');
    }

  }
  public readonly updateProfile = async (data: EmployeeVM, requester: EmployeeVM) => {
    const acc = { ...requester, ...data };
    if (acc.avatar && acc.avatar.includes(';base64')) {
      acc.avatar = await this.solveImage(acc.avatar, acc.id, 'employee/avatars') as any;
    }
    const employee = await this.employeeRepository.useHTTP().save(acc as any);
    return this.mapper.map(await this.employeeRepository.useHTTP().findOne({ id: employee.id }, { relations: ['devices', 'roles', 'notifications'] }), EmployeeVM, Employee)
  }

  // Customer
  public readonly loginCustomer = async (phone: string): Promise<any> => {
    return await this.customerRepository.useHTTP().findOne({ where: { phone } }).then((customer) => {
      if (customer != null) {
        return {
          accessToken: this.generateJWTCustomer(this.mapper.map(customer, CustomerVM, Customer)),
          fullname: customer.fullname,
          avatar: customer.avatar,
          id: customer.id,
        }
      } else {
        return { notExist: true };
      }
    });

  }
  public readonly registerCustomer = async (customer: CustomerCM): Promise<any> => {
    return await this.customerRepository.useHTTP().save({
      ...customer,
      frequency: 0,
      totalDeal: 0,
      totalSpending: 0,
      groups: [{ id: '3' }]
    } as any).then(async (res) => {
      return {
        accessToken: this.generateJWTCustomer(this.mapper.map(await this.customerRepository.useHTTP().findOne({ where: { id: res.id }, relations: ["devices"] }), CustomerVM, Customer)),
        fullname: res.fullname,
        avatar: res.avatar,
        id: res.id,
      }
    })
  }
  public readonly refreshCustomer = async (requester: CustomerVM, device?: DeviceCM) => {
    if (device?.id && !requester.devices.find((e) => e.id === device.id)) {
      const newDevice = await this.deviceRepository.useHTTP()
        .save({ ...device, employee: undefined, customer: { id: requester.id} } as any).then(async (data) => {
          return this.mapper.map(await this.deviceRepository.useHTTP().findOne({ id: data.id }, { relations: ['customer'] }), DeviceVM, Device);
        });
      requester.devices.push(newDevice);
      return requester;
    }
    return requester;
  }
  protected readonly generateJWTCustomer = (customer: CustomerVM): string => {
    return sign({ customer }, 'vzicqoasanQhtZicTmeGsBpacNomny', {
      audience: customer.email,
      issuer: 'crm',
      subject: 'se20fa27'
    });
  }
  public readonly updateCustomerProfile = async (data: CustomerVM, requester: CustomerVM) => {
    const cus = { ...requester, ...data };
    if (cus.avatar && cus.avatar.includes(';base64')) {
      cus.avatar = await this.solveImage(cus.avatar, cus.id, 'customer/avatars') as any;
    }
    const customer = await this.customerRepository.useHTTP().save(cus as any);
    return this.mapper.map(await this.customerRepository.useHTTP().findOne({ id: customer.id }, { relations: ['devices' ,'notifications'] }), CustomerVM, Customer)
  }

  private readonly solveImage = async (avatar: string, triggerName: string, path: string) => {
    const id = uuid();
    await this.firebaseService.useUploadFileBase64(path + id + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64")), avatar, avatar.substring(avatar.indexOf("data:image/") + 5, avatar.indexOf(";base64")));
    return environment.firebase.linkDownloadFile + path + id + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64"));
  }
  protected readonly validateEmployee = async (emailOrPhone: string, password: string): Promise<EmployeeVM> => {
    const option = isNaN(+emailOrPhone) ?
      { email: emailOrPhone }
      : { phone: emailOrPhone }
    return await this.employeeRepository.useHTTP().findOne({ where: { ...option }, relations: ["roles", "activitys", "devices"] }).then(
      async employee => {
        if (!employee) {
          throw new BadRequestException("Invalid email or phone", "Invalid email or phone");
        }
        if (!compareSync(password, employee?.passwordHash)) {
          throw new BadRequestException("Invalid Password", "Invalid Password");
        }
        return this.mapper.map(employee, EmployeeVM, Employee);
      }
    )
  }
}
