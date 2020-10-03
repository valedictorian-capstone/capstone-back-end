import { AccountExtraValue } from '@models';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountExtraValueRepository } from '@repositories';
import { ACCOUNT_EXTRA_VALUE_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { AccountExtraValueCM, AccountExtraValueUM, AccountExtraValueVM } from 'src/app/view-models';
import { In } from 'typeorm';
@Injectable()
export class AccountExtraValueService {

  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(ACCOUNT_EXTRA_VALUE_REPOSITORY) protected readonly repository: AccountExtraValueRepository
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<AccountExtraValueVM[]> => {
    return await this.repository.useHTTP().find(ids ? { id: In(ids)} : {})
      .then((models) => this.mapper.mapArray(models, AccountExtraValueVM, AccountExtraValue))
  };

  public readonly findById = async (id: string): Promise<AccountExtraValueVM> => {
    return await this.repository.useHTTP().findOne({id: id})
      .then((model) => {
        if (model !== null) {
          return this.mapper.map(model, AccountExtraValueVM, AccountExtraValue);
        }
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
      })
  };

  public readonly insert = (body: AccountExtraValueCM): Promise<AccountExtraValueVM> => {
    return this.repository.useHTTP().save(body as any)
      .then((model) => {
        return this.mapper.map(model, AccountExtraValueVM, AccountExtraValue)}).catch()
  };

  public readonly update = async (body: AccountExtraValueUM): Promise<AccountExtraValueVM> => {
    return await this.repository.useHTTP().findOne({id: body.id})
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body as any)
          .then((model) => (this.mapper.map(model, AccountExtraValueVM, AccountExtraValue)))
          .catch()
      });
  };

  public readonly remove = async (id: string): Promise<AccountExtraValueVM> => {
    return await this.repository.useHTTP().findOne({id: id})
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

  public readonly active = async (id: string): Promise<AccountExtraValueVM> => {
    return await this.repository.useHTTP().findOne({id: id})
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

  public readonly deactive = async (id: string): Promise<AccountExtraValueVM> => {
    return await this.repository.useHTTP().findOne({id: id})
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
