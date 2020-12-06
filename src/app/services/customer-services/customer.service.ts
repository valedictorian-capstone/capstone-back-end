import { InvalidException, NotFoundException } from '@exceptions';
import { Customer } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository, GroupRepository } from '@repositories';
import { FirebaseService, SocketService } from '@services';
import { CUSTOMER_REPOSITORY, FIREBASE_SERVICE, GROUP_REPOSITORY, SOCKET_SERVICE } from '@types';
import { CustomerCM, CustomerUM, CustomerVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { environment } from 'src/environments/environment';
import { In } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
    @Inject(GROUP_REPOSITORY) protected readonly groupRepository: GroupRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService,
  ) { }
  public readonly findAll = async (ids?: string[]): Promise<CustomerVM[]> => {
    return await this.cusomterRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["groups"] })
      .then(async (models) => {
        return this.mapper.mapArray(models, CustomerVM, Customer)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };
  public readonly findAllByLead = async (): Promise<CustomerVM[]> => {
    return await this.groupRepository.useHTTP().findOne({ where: { id: 3 }, relations: ['customers'] })
      .then((model) => {
        return this.mapper.mapArray(model.customers, CustomerVM, Customer);
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  }
  public readonly findById = async (id: string): Promise<CustomerVM> => {
    return await this.cusomterRepository.useHTTP().findOne({ where: { id: id }, relations: ["groups", "deals", "devices", "tickets"] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, CustomerVM, Customer);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };
  public readonly checkUnique = async (label: string, value: string): Promise<string> => {
    const query = { [label]: value };
    return this.cusomterRepository.useHTTP().findOne({ where: query })
      .then((model) => {
        return model ? true : false;
      }).catch(err => err);
  }
  public readonly import = async (body: CustomerCM[]): Promise<any> => {
    for (const customer of body) {
      if (customer.avatar && customer.avatar.includes(';base64')) {
        customer.avatar = this.solveImage(customer.avatar, customer.phone) as any;
      }
    }
    return await this.cusomterRepository.useHTTP().save(body).then(async (customers) => {
      const leadGroup = await this.groupRepository.useHTTP().findOne({ where: { id: 3 } });
      const group1 = await this.groupRepository.useHTTP().findOne({ where: { id: 0 } });
      const group2 = await this.groupRepository.useHTTP().findOne({ where: { id: 1 } });
      const group3 = await this.groupRepository.useHTTP().findOne({ where: { id: 2 } });
      const notOfLead = [];

      for (let i = 0; i < customers.length; i++) {
        if (customers[i].totalDeal == 0 && customers[i].totalSpending == 0 && customers[i].frequency == 0) {
          await this.cusomterRepository.useHTTP().save({ ...customers[i], groups: [leadGroup] })
        } else {
          notOfLead.push(customers[i]);
        }
      }

      const paramArray = [];
      for (let i = 0; i < notOfLead.length; i++) {
        paramArray.push([notOfLead[i].totalDeal, notOfLead[i].totalSpending, notOfLead[i].frequency])
      }

      let classificationGroups = await this.callClassification(paramArray);
      classificationGroups = JSON.parse(classificationGroups.replace(' ', ','));
      for (let i = 0; i < classificationGroups.length; i++) {
        console.log(classificationGroups[i]);
        if (classificationGroups[i] == '0') {
          await this.cusomterRepository.useHTTP().save({ ...notOfLead[i], groups: [group1] });
        } else if (classificationGroups[i] == '1') {
          await this.cusomterRepository.useHTTP().save({ ...notOfLead[i], groups: [group2] });
        } else {
          await this.cusomterRepository.useHTTP().save({ ...notOfLead[i], groups: [group3] });
        }
      }
      const rs = await this.findAll(customers.map((e) => e.id));
      this.socketService.with('customers', rs, 'list');
      return rs;
    });
  };
  private readonly callClassification = async (customerParam: [][]): Promise<string> => {
    return new Promise(async (resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { spawn } = require('child_process');
      const python = spawn('python', ['src/app/kmeans/classification.py', JSON.stringify(customerParam)]);
      python.stderr.pipe(process.stderr);
      await python.stdout.on('data', (data) => {
        resolve("" + data);
      });
    });
  };
  public readonly insert = async (body: CustomerCM): Promise<any> => {
    const customer = { ...body };
    if (customer.avatar && customer.avatar.includes(';base64')) {
      customer.avatar = this.solveImage(customer.avatar, customer.phone) as any;
    }
    return await this.cusomterRepository.useHTTP().save({ ...customer }).then(async (data) => {
      if (customer.totalDeal == 0 && customer.totalSpending == 0 && customer.frequency == 0) {
        const leadGroup = await this.groupRepository.useHTTP().findOne({ where: { id: 3 } });
        await this.cusomterRepository.useHTTP().save({ ...data, groups: [leadGroup] })
      } else {
        const paramArray = [];
        paramArray.push([customer.totalDeal, customer.totalSpending, customer.frequency])
        let classificationGroups = await this.callClassification(paramArray);
        classificationGroups = JSON.parse(classificationGroups.replace(' ', ','));
        if (classificationGroups == '0') {
          const group1 = await this.groupRepository.useHTTP().findOne({ where: { id: 0 } });
          await this.cusomterRepository.useHTTP().save({ ...data, groups: [group1] });
        } else if (classificationGroups == '1') {
          const group2 = await this.groupRepository.useHTTP().findOne({ where: { id: 1 } });
          await this.cusomterRepository.useHTTP().save({ ...data, groups: [group2] });
        } else {
          const group3 = await this.groupRepository.useHTTP().findOne({ where: { id: 2 } });
          await this.cusomterRepository.useHTTP().save({ ...data, groups: [group3] });
        }
      }
      const rs = await this.findById(data.id)
      this.socketService.with('customers', rs, 'create');
      return rs;
    });
  };
  public readonly update = async (body: CustomerUM): Promise<CustomerVM> => {
    return await this.cusomterRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          const customer = { ...body };
          if (customer.avatar && customer.avatar.includes(';base64')) {
            customer.avatar = this.solveImage(customer.avatar, customer.id) as any;
          }
          return await this.cusomterRepository.useHTTP().save(customer).then(async (customer) => {
            const rs = await this.findById(customer.id)
            this.socketService.with('customers', rs, 'update');
            return rs;
          }).catch(err => err);
        }
      });
  };
  public readonly remove = async (id: string): Promise<CustomerVM> => {
    return await this.cusomterRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.cusomterRepository.useHTTP()
          .save({ id, isDelete: true })
          .then(async (model) => {
            const rs = await this.findById(model.id)
            this.socketService.with('customers', rs, 'update');
            return rs;
          })
      });
  };
  public readonly restore = async (id: string): Promise<CustomerVM> => {
    return await this.cusomterRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.cusomterRepository.useHTTP()
          .save({ id, isDelete: false })
          .then(async (model) => {
            const rs = await this.findById(model.id)
            this.socketService.with('customers', rs, 'update');
            return rs;
          })
      });
  };
  private readonly solveImage = async (avatar: string, triggerName: string) => {
    await this.firebaseService.useUploadFileBase64("customer/avatars/" + triggerName + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64")), avatar, avatar.substring(avatar.indexOf("data:image/") + 5, avatar.indexOf(";base64")));
    return environment.firebase.linkDownloadFile + "customer/avatars/" + triggerName + "." + avatar.substring(avatar.indexOf("data:image/") + 11, avatar.indexOf(";base64"));
  }
}
