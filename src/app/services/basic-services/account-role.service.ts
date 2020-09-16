import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { ACCOUNT_ROLE_REPOSITORY } from 'src/app/constant';
import { AccountRoleCM, AccountRoleUM, AccountRoleVM } from 'src/app/dtos';
import { AccountRoleRepository } from 'src/app/repositories';

@Injectable()
export class AccountRoleService {
  constructor(
    @Inject('SEQUELIZE') protected readonly sequelize: Sequelize,
    @Inject(ACCOUNT_ROLE_REPOSITORY) protected readonly accountRoleRepository: AccountRoleRepository,
  ) {}

  public readonly findAll = async (): Promise<AccountRoleVM[]> => {
    const accountRoles = await this.accountRoleRepository.findAll({}, []);
    return accountRoles.map(
      accountRole =>
        new AccountRoleVM({
          Id: accountRole.Id,
          AccountId: accountRole.AccountId,
          RoleId: accountRole.RoleId,
          IsDelete: accountRole.IsDelete,
          CreatedAt: accountRole.CreatedAt,
          UpdatedAt: accountRole.UpdatedAt,
        }),
    );
  };

  public readonly findById = async (id: string): Promise<AccountRoleVM> => {
    const accountRole = await this.accountRoleRepository.findById(
      { Id: id },
      [],
    );
    if (accountRole !== null) {
      return new AccountRoleVM({
        Id: accountRole.Id,
        AccountId: accountRole.AccountId,
        RoleId: accountRole.RoleId,
        IsDelete: accountRole.IsDelete,
        CreatedAt: accountRole.CreatedAt,
        UpdatedAt: accountRole.UpdatedAt,
      });
    } else {
      throw new HttpException(
        'Can not find information of ' + id,
        HttpStatus.NOT_FOUND,
      );
    }
  };

  public readonly insert = async (
    body: AccountRoleCM,
  ): Promise<AccountRoleVM> => {
    try {
      const accountRole = await this.accountRoleRepository.insert({
        ...(body as any),
      });
      return new AccountRoleVM({
        Id: accountRole.Id,
        AccountId: accountRole.AccountId,
        RoleId: accountRole.RoleId,
        IsDelete: accountRole.IsDelete,
        CreatedAt: accountRole.CreatedAt,
        UpdatedAt: accountRole.UpdatedAt,
      });
    } catch (e) {
      throw new HttpException(
        'Error at [AccountRoleController] [insert function] with [message]: ' +
          e.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  public readonly update = async (body: AccountRoleUM): Promise<AccountRoleVM> => {
    try {
      await this.findById(body.Id);
      return await this.accountRoleRepository
        .update(body as any, { Id: body.Id })
        .then(() => {
          throw new HttpException(
            `Update information of ${body.Id} successfully !!!`,
            HttpStatus.CREATED,
          );
        })
        .catch(e => {
          throw new HttpException(
            'Error at [AccountRoleController] [update function] with [message]: ' +
              e.message,
            HttpStatus.BAD_REQUEST,
          );
        });
    } catch (e_1) {
      throw new HttpException(
        'Error at [AccountRoleController] [update function] with [message]: ' +
          e_1.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  public readonly remove = async (id: string): Promise<AccountRoleVM> => {
    try {
      await this.accountRoleRepository.remove({ Id: id });
      throw new HttpException(
        `Remove information of ${id} successfully !!!`,
        HttpStatus.CREATED,
      );
    } catch (e) {
      throw new HttpException(
        'Error at [AccountRoleController] [remove function] with [message]: ' +
          e.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  public readonly active = async (id: string): Promise<AccountRoleVM> => {
    try {
      await this.accountRoleRepository.update({ IsDelete: false } as any, {
        Id: id,
      });
      throw new HttpException(
        `Update information of ${id} successfully !!!`,
        HttpStatus.CREATED,
      );
    } catch (e) {
      throw new HttpException(
        'Error at [AccountRoleController] [active function] with [message]: ' +
          e.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  public readonly deactive = async (id: string): Promise<AccountRoleVM> => {
    try {
      await this.accountRoleRepository.update({ IsDelete: true } as any, {
        Id: id,
      });
      throw new HttpException(
        `Update information of ${id} successfully !!!`,
        HttpStatus.CREATED,
      );
    } catch (e) {
      throw new HttpException(
        'Error at [AccountRoleController] [deactive function] with [message]: ' +
          e.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  };
}
