import { InvalidException, NotFoundException } from '@exceptions';
import { Customer, CustomerExtraInformationData } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerExtraInformationDataRepository, ExtraInformationRepository, CustomerRepository } from '@repositories';
import { CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY, EXTRA_INFORMATION_REPOSITORY, CUSTOMER_REPOSITORY } from '@types';
import { CustomerCM, CustomerUM, CustomerVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
    @Inject(EXTRA_INFORMATION_REPOSITORY) protected readonly extraInformationRepository: ExtraInformationRepository,
    @Inject(CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY) protected readonly cusomterExtrDataRepository: CustomerExtraInformationDataRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CustomerVM[]> => {
    return await this.cusomterRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["groups", "wFInstances", "customerExtraInformationDatas"] })
      .then(async (models) => {
        for (const model of models) {
          model.customerExtraInformationDatas = await this.cusomterExtrDataRepository.useHTTP().find({ where: { customer: model }, relations: ["extraInformation", "customer"] });
          console.log(model.customerExtraInformationDatas[0] instanceof CustomerExtraInformationData);
        }
        return this.mapper.mapArray(models, CustomerVM, Customer)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<CustomerVM> => {
    return await this.cusomterRepository.useHTTP().findOne({ where: { id: id }, relations: ["groups", "wFInstances", "customerExtraInformationDatas"] })
      .then(async (model) => {
        if (model) {
          model.customerExtraInformationDatas = await this.cusomterExtrDataRepository.useHTTP().find({ where: { customer: model }, relations: ["extraInformation", "customer"] });
          return this.mapper.map(model, CustomerVM, Customer);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = async (body: CustomerCM): Promise<any> => {
    return await this.cusomterRepository.useHTTP().save(body).then(async (customer) => {
      await this.cusomterExtrDataRepository.useHTTP().save(body.customerExtras.map((e) => ({ ...e, customer })));
      return await this.findById(customer.id);
    }).catch(err => err);
  };

  public readonly update = async (body: CustomerUM): Promise<CustomerVM[]> => {
    return await this.cusomterRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.cusomterRepository.useHTTP()
          .save(body)
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
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
