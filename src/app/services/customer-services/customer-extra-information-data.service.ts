import { NotFoundException } from '@exceptions';
import { CustomerExtraInformationData } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerExtraInformationDataRepository } from '@repositories';
import { CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY } from '@types';
import { CustomerExtraInformationDataCM, CustomerExtraInformationDataUM, CustomerExtraInformationDataVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class CustomerExtraInformationDataService {
  constructor(
    @Inject(CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY) protected readonly repository: CustomerExtraInformationDataRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<CustomerExtraInformationDataVM[]> => {
    return await this.repository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, CustomerExtraInformationDataVM, CustomerExtraInformationData))
  };

  public readonly findById = async (id: string): Promise<CustomerExtraInformationDataVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, CustomerExtraInformationDataVM, CustomerExtraInformationData);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: CustomerExtraInformationDataCM): Promise<CustomerExtraInformationDataVM> => {
    return this.repository.useHTTP().insert(body)
      .then((model) => (this.mapper.map(model.generatedMaps[0], CustomerExtraInformationDataVM, CustomerExtraInformationData as any)))
  };

  public readonly update = async (body: CustomerExtraInformationDataUM): Promise<CustomerExtraInformationDataVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => (this.mapper.map(body, CustomerExtraInformationDataVM, CustomerExtraInformationDataUM)))
      });
  };

  public readonly remove = async (id: string): Promise<CustomerExtraInformationDataVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<CustomerExtraInformationDataVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
      });
  };

  public readonly deactive = async (id: string): Promise<CustomerExtraInformationDataVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
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
