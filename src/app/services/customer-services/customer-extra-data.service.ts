import { NotFoundException } from '@exceptions';
import { CustomerExtraData } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerExtraDataRepository } from '@repositories';
import { CUSTOMER_EXTRA_DATA_REPOSITORY } from '@types';
import { CustomerExtraDataCM, CustomerExtraDataUM, CustomerExtraDataVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class CustomerExtraDataService {
  constructor(
    @Inject(CUSTOMER_EXTRA_DATA_REPOSITORY) protected readonly repository: CustomerExtraDataRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<CustomerExtraDataVM[]> => {
    return await this.repository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, CustomerExtraDataVM, CustomerExtraData))
  };

  public readonly findById = async (id: string): Promise<CustomerExtraDataVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, CustomerExtraDataVM, CustomerExtraData);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: CustomerExtraDataCM): Promise<CustomerExtraDataVM> => {
    return this.repository.useHTTP().insert(body as any)
      .then((model) => (this.mapper.map(model.generatedMaps[0], CustomerExtraDataVM, CustomerExtraData as any)))
  };

  public readonly update = async (body: CustomerExtraDataUM): Promise<CustomerExtraDataVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => (this.mapper.map(body, CustomerExtraDataVM, CustomerExtraDataUM)))
      });
  };

  public readonly remove = async (id: string): Promise<CustomerExtraDataVM> => {
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

  public readonly active = async (id: string): Promise<CustomerExtraDataVM> => {
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

  public readonly deactive = async (id: string): Promise<CustomerExtraDataVM> => {
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
