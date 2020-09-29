import { InvalidException, NotFoundException } from '@exceptions';
import { Customer, CustomerExtraInformationData } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerExtraInformationDataRepository, CustomerExtraInformationRepository, CustomerRepository } from '@repositories';
import { CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY, CUSTOMER_EXTRA_INFORMATION_REPOSITORY, CUSTOMER_REPOSITORY } from '@types';
import { CustomerCM, CustomerUM, CustomerVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) protected readonly cusomterRepository: CustomerRepository,
    @Inject(CUSTOMER_EXTRA_INFORMATION_REPOSITORY) protected readonly cusomterExtrInfoRepository: CustomerExtraInformationRepository,
    @Inject(CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY) protected readonly cusomterExtrDataRepository: CustomerExtraInformationDataRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<CustomerVM[]> => {
    return await this.cusomterRepository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, CustomerVM, Customer))
  };

  public readonly findById = async (id: string): Promise<CustomerVM> => {
    return await this.cusomterRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, CustomerVM, Customer);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = async (body: CustomerCM): Promise<any> => {
    //insert normal col 
    this.cusomterRepository.useHTTP().save(body).then(async customer => {
      //insert extra col
      const cusExtrDatas = []
      for (let index = 0; index < body.customerExtrs.length; index++) {
        const customExtr = body.customerExtrs[index];
        await this.cusomterExtrInfoRepository.useHTTP().findOne({ name: customExtr.name })
          .then(cusExtInfo => {
            if (cusExtInfo === undefined) {
              throw new InvalidException(`invalid`)
            }
            const cusExtData = new CustomerExtraInformationData();
            cusExtData.customer = customer
            cusExtData.customerExtraInformation = cusExtInfo
            cusExtData.value = customExtr.value
            cusExtrDatas.push(cusExtData);
          })
      }
      await this.cusomterExtrDataRepository.useHTTP().save(cusExtrDatas).then(e => console.log(e));
    })
  };

  public readonly update = async (body: CustomerUM): Promise<CustomerVM> => {
    return await this.cusomterRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.cusomterRepository.useHTTP()
          .save(body)
          .then(() => (this.mapper.map(body, CustomerVM, CustomerUM)))
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

  public readonly active = async (id: string): Promise<CustomerVM> => {
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
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
      });
  };

  public readonly deactive = async (id: string): Promise<CustomerVM> => {
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
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
      });
  };
}
