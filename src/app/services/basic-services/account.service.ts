import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { AccountRepository } from 'src/app/repositories';
import { ACCOUNT_REPOSITORY } from 'src/app/types';
import { AccountCM, AccountUM, AccountVM } from 'src/app/view-models';

@Injectable()
export class AccountService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(ACCOUNT_REPOSITORY) protected readonly repository: AccountRepository,
  ) {}

  public readonly findAll = async (): Promise<AccountVM[]> => {
    return await this.repository.findAll({}, [])
      .then((models) => models.map((model) => new AccountVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [AccountController] [findAll function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly findById = async (id: string): Promise<AccountVM> => {
    return await this.repository.findById({ Id: id }, [])
      .then((model) => {
        if (model !== null) {
          return new AccountVM({...model.get()});
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
    return this.repository.insert({...body as any, PasswordHash: hashSync(body.Password, 10)})
      .then((model) => (new AccountVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [AccountController] [insert function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly update = async (body: AccountUM): Promise<AccountVM> => {
    return await this.findById(body.Id)
      .then(async () => {
        return await this.repository
          .update(body as any, { Id: body.Id })
          .then(() => (new AccountVM({...body})))
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
    return await this.findById(id)
      .then(async () => {
        return await this.repository
          .remove({Id: id})
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
    return await this.findById(id)
      .then(async () => {
        return await this.repository
          .update({IsDelete: false} as any, { Id: id })
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
    return await this.findById(id)
      .then(async () => {
        return await this.repository
          .update({IsDelete: true} as any, { Id: id })
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
