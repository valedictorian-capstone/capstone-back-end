import { NotFoundException } from '@exceptions';
import { Employee } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepository, RoleRepository } from '@repositories';
import { EMPLOYEE_REPOSITORY, FIREBASE_SERVICE, ROLE_REPOSITORY, SOCKET_SERVICE } from '@types';
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
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    protected readonly emailService: EmailService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  public readonly findAll = async (requester?: EmployeeVM, ids?: string[]): Promise<any> => {
    const level = requester ? Math.min(...requester.roles.map((e) => e.level)) : undefined;
    const queryId = ids ? {
      id: In(ids)
    } : {};
    await this.employeeRepository.useHTTP().find({ where: { ...queryId }, relations: ["devices", "roles", "activitys"] })
      .then(async results => {
        return results.map(employee => {
          const wonDealCount = employee.deals.filter(deal => deal.status === 'won').length;
          const loseDealCount = employee.deals.filter(deal => deal.status === 'lose').length;
          return { ...employee, wonDealCount: wonDealCount, loseDealCount: loseDealCount };
        })
          .filter((employee) => level != null && Math.min(...employee.roles.map((e) => e.level)) > level);
      });
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
    return await this.employeeRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.employeeRepository.useHTTP()
          .remove(model)
          .then(() => {
            const rs = this.mapper.map({ ...model, id } as Employee, EmployeeVM, Employee);
            this.socketService.with('employees', rs, 'remove');
            return rs;
          })
      });
  }
  public readonly restore = async (id: string): Promise<EmployeeVM> => {
    return await this.employeeRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.employeeRepository.useHTTP()
          .save({ id, isDelete: false })
          .then(async () => {
            const rs = await this.findById(id)
            this.socketService.with('employees', rs, 'update');
            return rs;
          })
      });
  };
  private readonly solveImage = async (avatar: string) => {
    const id = uuid();
    await this.firebaseService.useUploadFileBase64("employee/avatars/" + id + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64")), avatar, avatar.substring(avatar.indexOf("data:image/") + 5, avatar.indexOf(";base64")));
    return environment.firebase.linkDownloadFile + "employee/avatars/" + id + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64"));
  }
}
