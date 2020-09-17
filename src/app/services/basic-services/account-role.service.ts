import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { AccountRoleRepository } from 'src/app/repositories';
import { ACCOUNT_ROLE_REPOSITORY } from 'src/app/types';
import { AccountRoleCM, AccountRoleUM, AccountRoleVM } from 'src/app/view-models';

@Injectable()
export class AccountRoleService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(ACCOUNT_ROLE_REPOSITORY) protected readonly repository: AccountRoleRepository,
  ) { }
  public readonly findAll = async (): Promise<AccountRoleVM[]> => {
    return await this.repository.findAll({}, [])
      .then((models) => models.map((model) => new AccountRoleVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [AccountRoleController] [findAll function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly findById = async (id: string): Promise<AccountRoleVM> => {
    return await this.repository.findById({ Id: id }, [])
      .then((model) => {
        if (model !== null) {
          return new AccountRoleVM({...model.get()});
        }
        throw new HttpException(
          `Error at [AccountRoleController] [findById function] with [message]: Can not find ${id}`,
          HttpStatus.NOT_FOUND
        );
      })
      .catch((e) => {
        throw new HttpException(
          `Error at [AccountRoleController] [findById function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly insert = (body: AccountRoleCM): Promise<AccountRoleVM> => {
    return this.repository.insert(body as any)
      .then((model) => (new AccountRoleVM({...model.get()})))
      .catch((e) => {
        throw new HttpException(
          `Error at [AccountRoleController] [insert function] with [message]: ${e.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  };

  public readonly update = async (body: AccountRoleUM): Promise<AccountRoleVM> => {
    return await this.findById(body.Id)
      .then(async () => {
        return await this.repository
          .update(body as any, { Id: body.Id })
          .then(() => (new AccountRoleVM({...body})))
          .catch(e => {
            throw new HttpException(
              'Error at [AccountRoleController] [update function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly remove = async (id: string): Promise<AccountRoleVM> => {
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
              'Error at [AccountRoleController] [remove function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly active = async (id: string): Promise<AccountRoleVM> => {
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
              'Error at [AccountRoleController] [active function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };

  public readonly deactive = async (id: string): Promise<AccountRoleVM> => {
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
              'Error at [AccountRoleController] [deactive function] with [message]: ' +
              e.message,
              HttpStatus.BAD_REQUEST,
            );
          });
      });
  };
}