import { NotFoundException } from '@exceptions';
import { CustomerExtraInformation } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerExtraInformationRepository } from '@repositories';
import { CUSTOMER_EXTRA_INFORMATION_REPOSITORY } from '@types';
import { CustomerExtraInformationUM, CustomerExtraInformationVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class CustomerExtraInformationService {
  constructor(
    @Inject(CUSTOMER_EXTRA_INFORMATION_REPOSITORY) protected readonly cusomterExtInfoRepository: CustomerExtraInformationRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<CustomerExtraInformationVM[]> => {
    return await this.cusomterExtInfoRepository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, CustomerExtraInformationVM, CustomerExtraInformation))
  };

  public readonly findById = async (id: string): Promise<CustomerExtraInformationVM> => {
    return await this.cusomterExtInfoRepository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, CustomerExtraInformationVM, CustomerExtraInformation);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: CustomerExtraInformationUM[]): Promise<any> => {
    return this.cusomterExtInfoRepository.useHTTP().save(body)
      .then(
        (models) => {
          console.log(models)
          const ids = [];
          models.map(model => ids.push(model.id));
          return this.findAll(ids);
        }
      )
  };
}
