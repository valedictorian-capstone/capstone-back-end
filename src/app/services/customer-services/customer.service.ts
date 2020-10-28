import { InvalidException, NotFoundException } from '@exceptions';
import { Customer } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from '@repositories';
import { CUSTOMER_REPOSITORY, FIREBASE_SERVICE } from '@types';
import { CustomerCM, CustomerUM, CustomerVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { environment } from 'src/environments/environment';
import { In } from 'typeorm';
import { FirebaseService } from '../extra-services';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CustomerVM[]> => {
    return await this.cusomterRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["groups", "wFInstances"] })
      .then(async (models) => {
        return this.mapper.mapArray(models, CustomerVM, Customer)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findAllByType = async (type: string): Promise<CustomerVM[]> => {
    return await this.cusomterRepository.useHTTP().find({ where: { type: type }, relations: ["groups", "wFInstances"] })
      .then(async (models) => {
        return this.mapper.mapArray(models, CustomerVM, Customer)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };


  public readonly findById = async (id: string): Promise<CustomerVM> => {
    return await this.cusomterRepository.useHTTP().findOne({ where: { id: id }, relations: ["groups", "wFInstances"] })
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
    return await this.cusomterRepository.useHTTP().save(body).then(async (customers) => {
      return customers;
    }).catch(err => err);
  };

  public readonly insert = async (body: CustomerCM): Promise<any> => {
    const customer = { ...body };
    // await this.firebaseService.useUploadFileBase64("avatars/" + customer.phone + "." + customer.avatar.substring(customer.avatar.indexOf("data:image/") + 11, customer.avatar.indexOf(";base64")), customer.avatar, customer.avatar.substring(customer.avatar.indexOf("data:image/") + 5, customer.avatar.indexOf(";base64")));
    // customer.avatar = environment.firebase.linkDownloadFile + "avatars/" + customer.phone + "." + customer.avatar.substring(customer.avatar.indexOf("data:image/") + 11, customer.avatar.indexOf(";base64"));
    return await this.cusomterRepository.useHTTP().save({ ...customer }).then(async (data) => {
      return data;
    }).catch(err => err);
  };

  public readonly update = async (body: CustomerUM): Promise<CustomerVM> => {
    return await this.cusomterRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          return await this.cusomterRepository.useHTTP().save(body).then(async (customer) => {
            return await this.findById(customer.id);
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
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<CustomerVM[]> => {
    return await this.cusomterRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.cusomterRepository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<CustomerVM[]> => {
    return await this.cusomterRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.cusomterRepository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
