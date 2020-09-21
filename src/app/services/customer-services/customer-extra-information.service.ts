import { NotFoundException } from '@exceptions';
import { CustomerExtraInformation } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerExtraInformationRepository } from '@repositories';
import { CUSTOMER_EXTRA_INFORMATION_REPOSITORY } from '@types';
import { CustomerExtraInformationCM, CustomerExtraInformationUM, CustomerExtraInformationVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class CustomerExtraInformationService {
  constructor(
    @Inject(CUSTOMER_EXTRA_INFORMATION_REPOSITORY) protected readonly repository: CustomerExtraInformationRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<CustomerExtraInformationVM[]> => {
    return await this.repository.useHTTP().find()
      .then((models) => this.mapper.mapArray(models, CustomerExtraInformationVM, CustomerExtraInformation))
  };

  public readonly findById = async (id: string): Promise<CustomerExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, CustomerExtraInformationVM, CustomerExtraInformation);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: CustomerExtraInformationCM): Promise<CustomerExtraInformationVM> => {
    return this.repository.useHTTP().insert(body)
      .then((model) => (this.mapper.map(model.generatedMaps[0], CustomerExtraInformationVM, CustomerExtraInformation as any)))
  };

  public readonly update = async (body: CustomerExtraInformationUM): Promise<CustomerExtraInformationVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => (this.mapper.map(body, CustomerExtraInformationVM, CustomerExtraInformationUM)))
      });
  };

  public readonly remove = async (id: string): Promise<CustomerExtraInformationVM> => {
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

  public readonly active = async (id: string): Promise<CustomerExtraInformationVM> => {
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

  public readonly deactive = async (id: string): Promise<CustomerExtraInformationVM> => {
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
