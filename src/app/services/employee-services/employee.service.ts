import { NotFoundException } from '@exceptions';
import { Employee } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { DeviceRepository, EmployeeRepository, NotificationRepository, RoleRepository } from '@repositories';
import { DEVICE_REPOSITORY, EMPLOYEE_REPOSITORY, FIREBASE_SERVICE, NOTIFICATION_REPOSITORY, ROLE_REPOSITORY, SOCKET_SERVICE } from '@types';
import { EmployeeCM, EmployeeUM, EmployeeVM } from '@view-models';
import { hashSync } from 'bcrypt';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { environment } from 'src/environments/environment';
import { In } from 'typeorm';
import { uuid } from 'uuidv4';
import { EmailService, FirebaseService, SocketService } from '../extra-services';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_REPOSITORY) protected readonly employeeRepository: EmployeeRepository,
    @Inject(ROLE_REPOSITORY) protected readonly roleRepository: RoleRepository,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly notificationRepository: NotificationRepository,
    @Inject(DEVICE_REPOSITORY) protected readonly deviceRepository: DeviceRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    protected readonly emailService: EmailService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  
  public readonly findAll = async (requester?: EmployeeVM, ids?: string[]): Promise<EmployeeVM[]> => {
    const level = requester ? Math.min(...requester.roles.map((e) => e.level)) : undefined;
    const queryId = ids ? {
      id: In(ids)
    } : {};
    return await this.mapper.mapArray(await this.employeeRepository.useHTTP()
      .find({ where: { ...queryId }, relations: ["devices", "roles", "activitys","deals", "tickets", "feedbackTickets"] }), EmployeeVM, Employee)
      .filter((employee) => requester && (Math.min(...employee.roles.map((e) => e.level)) > level) || requester.id === employee.id);
  };

  public readonly findById = async (id: string): Promise<EmployeeVM> => {
    return await this.employeeRepository.useHTTP().findOne({ where: { id: id }, relations: ["devices", "roles", "activitys"] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, EmployeeVM, Employee);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly valid = async (data: { code: string, phone: string, email: string, position: number }[]): Promise<{ code: string, phone: string, email: string, position: number }[]> => {
    const rs = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      rs.push({
        position: item.position,
        email: (await this.checkUnique('email', item.email)) || data.find((it) => it.position !== item.position && it.email === item.email) ? 'Duplicated' : undefined,
        phone: (await this.checkUnique('phone', item.phone)) || data.find((it) => it.position !== item.position && it.phone === item.phone) ? 'Duplicated' : undefined,
                code: (await this.checkUnique('code', item.code)) || data.find((it) => it.position !== item.position && it.code === item.code) ? 'Duplicated' : undefined,
      })
    }
    return rs;
  }

  public readonly checkUnique = async (label: string, value: string): Promise<boolean> => {
    const query = { [label]: value };
    return this.employeeRepository.useHTTP().findOne({ where: query })
      .then((model) => {
        return model ? true : false;
      })
  }

  public readonly query = async (id: string): Promise<EmployeeVM[]> => {
    return await this.employeeRepository.useHTTP().find({
      where: id ? {
        roles: [{ id }]
      } : {},
      relations: ["devices", "roles", "activitys"],
    })
      .then((models) => {
        return this.mapper.mapArray(models, EmployeeVM, Employee);
      })
  };

  public readonly import = async (body: EmployeeCM[]): Promise<any> => {
    for (const employee of body) {
      if (employee.avatar && employee.avatar.includes(';base64')) {
        employee.avatar = await this.solveImage(employee.avatar) as any;
      }
    }
    return await this.employeeRepository.useHTTP().save(body as any).then(async (employees: Employee[]) => {
      for (const acc of body) {
        await this.emailService.sendManualEmailCustomer({
          info: acc as any,
          subject: 'EMPLOYEE EMPLOYEE FOR SYSTEM',
          content: '<span>Email: </span> ' + acc.email + '<br>' +
            '<span>Password: </span> ' + acc.password
        });
      }
      const rs = await this.findAll(undefined, employees.map((e) => e.id));
      this.socketService.with('employees', rs, 'list');
      return rs;
    });
  };

  public readonly insert = async (body: EmployeeCM): Promise<EmployeeVM> => {
    const acc = { ...body };
    if (acc.avatar && acc.avatar.includes(';base64')) {
      acc.avatar = await this.solveImage(acc.avatar) as any;
    }
    return await this.employeeRepository.useHTTP().save({ ...acc, passwordHash: hashSync(acc.password, 10) } as any).then(async (employee) => {
      await this.emailService.sendManualEmailCustomer({
        info: employee as any,
        subject: 'EMPLOYEE EMPLOYEE FOR SYSTEM',
        content: '<span>Email: </span> ' + acc.email + '<br>' +
          '<span>Password: </span> ' + acc.password
      });
      const rs = await this.findById(employee.id)
      this.socketService.with('employees', rs, 'create');
      return rs;
    });
  };

  public readonly update = async (body: EmployeeUM): Promise<EmployeeVM> => {
    return await this.employeeRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          const acc = { ...body };
          if (acc.avatar && acc.avatar.includes(';base64')) {
            acc.avatar = await this.solveImage(acc.avatar) as any;
          }
          return await this.employeeRepository.useHTTP().save(body as any).then(async (employee) => {
            const rs = await this.findById(employee.id)
            this.socketService.with('employees', rs, 'update');
            return rs;
          })
        }
      });
  };

  public readonly remove = async (id: string): Promise<EmployeeVM> => {
    return await this.employeeRepository.useHTTP().findOne({ id: id }, {relations: ['notifications', 'devices']})
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        await this.deviceRepository.useHTTP().remove(model.devices);
        await this.notificationRepository.useHTTP().remove(model.notifications);
        return await this.employeeRepository.useHTTP()
          .remove(model)
          .then(() => {
            const rs = this.mapper.map({ ...model, id } as Employee, EmployeeVM, Employee);
            this.socketService.with('employees', rs, 'remove');
            return rs;
          })
      });
  }

  public readonly assignDealForEmployees = async (employeeID: string, dealIds: string[]): Promise<any> => {
    //check exist employees
    const employee = await this.employeeRepository.useHTTP().findOne({
      where: { id: employeeID },
      relations: ["devices", "roles", "activitys", "deals"],
    })

    if (!employee) {
      throw new NotFoundException('Employee id ' + employeeID + ' is not found.');
    }
    employee.deals.push(dealIds as any);
    return await this.employeeRepository.useHTTP().save(employee);
  }

  private readonly solveImage = async (avatar: string) => {
    const id = uuid();
    await this.firebaseService.useUploadFileBase64("employee/avatars/" + id + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64")), avatar, avatar.substring(avatar.indexOf("data:image/") + 5, avatar.indexOf(";base64")));
    return environment.firebase.linkDownloadFile + "employee/avatars/" + id + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64"));
  }
}
