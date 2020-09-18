import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { AccountRepository } from '@repositories';
import { ACCOUNT_REPOSITORY } from '@types';
import { AccountCM, AccountUM, AccountVM } from '@view-models';
import { Account } from '@models';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly repository: AccountRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) {}

  public readonly findAll = async (): Promise<AccountVM[]> => {
    return await this.repository.find()
      .then((models) => this.mapper.mapArray(models, AccountVM, Account))
      .catch((e) => {
        throw new HttpException(
          `Error at [AccountController] [findAll function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly findById = async (id: string): Promise<AccountVM> => {
    return await this.repository.findOne(id)
      .then((model) => {
        if (model !== null) {
          return this.mapper.map(model, AccountVM, Account);
        }
        throw new HttpException(
          `Error at [AccountController] [findById function] with [message]: Can not find ${id}`,
          HttpStatus.NOT_FOUND
        );
      })
      .catch((e) => {
        throw new HttpException(
          `Error at [AccountController] [findById function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly insert = (body: AccountCM): Promise<AccountVM> => {
    return this.repository.save(body)
      .then((model) => (this.mapper.map(model, AccountVM, Account)))
      .catch((e) => {
        throw new HttpException(
          `Error at [AccountController] [insert function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly update = async (body: AccountUM): Promise<AccountVM> => {
    return await this.repository.findOne(body.Id)
      .then(async () => {
        return await this.repository
          .save(body)
          .then(() => (this.mapper.map(body, AccountVM, AccountUM)))
          .catch(e => {
            throw new HttpException(
              'Error at [AccountController] [update function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly remove = async (id: string): Promise<AccountVM> => {
    return await this.repository.findOne(id)
      .then(async (model) => {
        return await this.repository
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [AccountController] [remove function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly active = async (id: string): Promise<AccountVM> => {
    return await this.repository.findOne(id)
      .then(async (model) => {
        return await this.repository
          .save({...model, IsDelete: false})
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [AccountController] [active function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly deactive = async (id: string): Promise<AccountVM> => {
    return await this.repository.findOne(id)
      .then(async (model) => {
        return await this.repository
          .save({...model, IsDelete: true})
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          })
          .catch(e => {
            throw new HttpException(
              'Error at [AccountController] [deactive function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };
}
