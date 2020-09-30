import { InvalidException, NotFoundException } from '@exceptions';
import { Account, Role } from '@models';
import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { AccountRepository, RoleRepository } from '@repositories';
import { ACCOUNT_REPOSITORY, ROLE_REPOSITORY } from '@types';
import { AccountCM, AccountUM, AccountVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(ROLE_REPOSITORY) protected readonly roleRepository: RoleRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<AccountVM[]> => {
    return await this.accountRepository.useHTTP().find({ relations: ["roles"] })
      .then((models) => this.mapper.mapArray(models, AccountVM, Account))
  };

  public readonly findOne = async (options: any): Promise<Account> => {
    return await this.accountRepository.useHTTP().findOne(options, { relations: ["roles"] })
      .then((model) => {
        if (model) {
          return model;
        }
        throw new NotFoundException(
          `Can not find with options ${options}`,
        );
      })
  };

  public readonly findById = async (id: string): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ id: id },{ relations: ["roles"] })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, AccountVM, Account);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = async (body: AccountCM): Promise<AccountVM> => {
    const account = this.mapper.map(body, Account, AccountCM);
    account.roles = await this.roleRepository.useHTTP().find({ name: In(body.roleName) });
    return await this.accountRepository.useHTTP().save(account)
      .then((model) => (this.mapper.map(model, AccountVM, Account as any)))
  };

  public readonly update = async (body: AccountUM): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.accountRepository.useHTTP()
          .save(body)
          .then(() => (this.mapper.map(body, AccountVM, AccountUM)))
      });
  };

  public readonly remove = async (id: string): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.accountRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          }).catch(e => {
            Logger.error(e);
            return null;
          })
      })
  };

  public readonly active = async (id: string): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.accountRepository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          }).catch(e => {
            Logger.error(e);
            return null;
          })
      })
  };

  public readonly deactive = async (id: string): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.accountRepository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            throw new HttpException(
              `Update information of ${id} successfully !!!`,
              HttpStatus.CREATED,
            );
          }).catch(e => {
            Logger.error(e);
            return null;
          })
      })
  };
}
