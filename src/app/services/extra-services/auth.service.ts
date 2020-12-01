import { Account, Customer } from '@models';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository, CustomerRepository, DeviceRepository } from '@repositories';
import { ACCOUNT_REPOSITORY, CUSTOMER_REPOSITORY, DEVICE_REPOSITORY, FIREBASE_SERVICE } from '@types';
import { AccountVM, CustomerCM, CustomerVM, DeviceCM } from '@view-models';
import { compareSync, hashSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { environment } from 'src/environments/environment';
import { FirebaseService } from '.';

@Injectable()
export class AuthService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @Inject(DEVICE_REPOSITORY) protected readonly deviceRepository: DeviceRepository,
    private readonly jwtService: JwtService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
  ) { }

  public readonly login = async (emailOrPhone: string, password: string,): Promise<any> => {
    return await this.validateAccount(emailOrPhone, password).then(
      async (account) => {
        if (account) {
          return {
            expiresIn: '24h',
            accessToken: this.generateJWT({
              fullname: account.fullname,
              id: account.id,
              email: account.email,
              phone: account.phone,
            } as any),
            devices: account.devices,
            roles: account.roles,
            fullname: account.fullname,
            avatar: account.avatar,
            id: account.id,
          };
        }
      }
    )
  }
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
      groups: [{id: '3'}]
    } as any).then(async (res) => {
      return {
        accessToken: this.generateJWTCustomer(this.mapper.map(await this.customerRepository.useHTTP().findOne({ where: { id: res.id }, relations: ["devices"] }), CustomerVM, Customer)),
        fullname: res.fullname,
        avatar: res.avatar,
        id: res.id,
      }
    })
  }
  public readonly refresh = async (token: string, device: DeviceCM) => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const account = await this.accountRepository.useHTTP().findOne({ where: { id: Object.assign(decoded.valueOf()).account.id }, relations: ["roles", "activitys", "devices"] });
    if (device.id && !account.devices.find((e) => e.id === device.id)) {
      const rs = (await this.deviceRepository.useHTTP().save({ ...device, account: account, customer: undefined }));
      account.devices.push(rs);
      return this.mapper.map(account, AccountVM, Account);
    }
    return this.mapper.map(account, AccountVM, Account);
  }
  public readonly refreshCustomer = async (token: string, device: DeviceCM) => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const customer = await this.customerRepository.useHTTP().findOne({ where: { id: Object.assign(decoded.valueOf()).customer.id }, relations: ["devices"] });
    if (device.id && !customer.devices.find((e) => e.id === device.id)) {
      const rs = (await this.deviceRepository.useHTTP().save({ ...device, customer, account: undefined }));
      customer.devices.push(rs);
      return this.mapper.map(customer, CustomerVM, Customer);
    }
    return this.mapper.map(customer, CustomerVM, Customer);
  }
  protected readonly generateJWT = (account: AccountVM): string => {
    return sign({ account }, 'vzicqoasanQhtZicTmeGsBpacNomny', {
      expiresIn: '24h',
      audience: account.email,
      issuer: 'crm',
      subject: 'se20fa27'
    });
  }
  protected readonly generateJWTCustomer = (customer: CustomerVM): string => {
    return sign({ customer }, 'vzicqoasanQhtZicTmeGsBpacNomny', {
      audience: customer.email,
      issuer: 'crm',
      subject: 'se20fa27'
    });
  }
  public readonly updateCustomerProfile = async (data: CustomerVM, token: string) => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const cus = { ...data, id: Object.assign(decoded.valueOf()).customer.id };
    if (cus.avatar && !cus.avatar.includes(';base64')) {
      await this.firebaseService.useUploadFileBase64("customer/avatars/" + cus.phone + "." + cus.avatar.substring(cus.avatar.indexOf("data:image/") + 11, cus.avatar.indexOf(";base64")), cus.avatar, cus.avatar.substring(cus.avatar.indexOf("data:image/") + 5, cus.avatar.indexOf(";base64")));
      cus.avatar = environment.firebase.linkDownloadFile + "customer/avatars/" + cus.phone + "." + cus.avatar.substring(cus.avatar.indexOf("data:image/") + 11, cus.avatar.indexOf(";base64"));
    }
    const customer = await this.customerRepository.useHTTP().save(cus as any);
    return this.mapper.map(customer, CustomerVM, Customer);
  }
  public readonly updatePassword = async (data: { password: string }, token: string) => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const account = Object.assign(decoded.valueOf()).account;
    return await this.accountRepository.useHTTP().save({ id: account.id, passwordHash: hashSync(data.password, 10) } as any).then(() => null);
  }
  public readonly updateProfile = async (data: AccountVM, token: string) => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const acc = { ...data, id: Object.assign(decoded.valueOf()).account.id };
    if (acc.avatar && !acc.avatar.includes(';base64')) {
      await this.firebaseService.useUploadFileBase64("employee/avatars/" + acc.phone + "." + acc.avatar.substring(acc.avatar.indexOf("data:image/") + 11, acc.avatar.indexOf(";base64")), acc.avatar, acc.avatar.substring(acc.avatar.indexOf("data:image/") + 5, acc.avatar.indexOf(";base64")));
      acc.avatar = environment.firebase.linkDownloadFile + "employee/avatars/" + acc.phone + "." + acc.avatar.substring(acc.avatar.indexOf("data:image/") + 11, acc.avatar.indexOf(";base64"));
    }
    const account = await this.accountRepository.useHTTP().save(acc as any);
    return this.mapper.map(account, AccountVM, Account);
  }
  protected readonly validateAccount = async (emailOrPhone: string, password: string): Promise<AccountVM> => {
    const option = isNaN(+emailOrPhone) ?
      { email: emailOrPhone }
      : { phone: emailOrPhone }
    return await this.accountRepository.useHTTP().findOne({ where: { ...option }, relations: ["roles", "activitys", "devices"] }).then(
      async account => {
        if (!account) {
          throw new UnauthorizedException("Invalid email or phone", "Invalid email or phone");
        }
        if (!compareSync(password, account?.passwordHash)) {
          throw new UnauthorizedException("Invalid Password", "Invalid Password");
        }
        return this.mapper.map(account, AccountVM, Account);
      }
    )
  }
}
