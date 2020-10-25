import { InvalidException, NotFoundException } from '@exceptions';
import { Account } from '@models';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from '@repositories';
import { ACCOUNT_REPOSITORY } from '@types';
import { AccountCM, AccountUM, AccountVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    private readonly jwtService: JwtService
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<AccountVM[]> => {
    return await this.accountRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["accountDepartments"] })
      .then(async (models) => {
        return this.mapper.mapArray(models, AccountVM, Account)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ where: { id: id }, relations: ["accountDepartments"] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, AccountVM, Account);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly findByJWT = async (jwt: string): Promise<AccountVM> => {
    console.log(this.jwtService.decode(jwt));
    return this.mapper.map(this.jwtService.decode(jwt)['account'] as Account, AccountVM, Account);
  }

  public readonly checkUnique = async (label: string, value: string): Promise<string> => {
    const query = { [label]: value };
    return this.accountRepository.useHTTP().findOne({ where: query })
      .then((model) =>{
        return model ? true : false;
      }).catch(err => err);
  }

  public readonly insert = async (body: AccountCM): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().save(body).then(async (account) => {
      return await this.findById(account.id);
    }).catch(err => err);
  };

  public readonly update = async (body: AccountUM): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }else{
          return await this.accountRepository.useHTTP().save(body).then(async (account) => {
            return await this.findById(account.id);
          }).catch(err => err);
        } 
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
          })
      });
  };

  public readonly active = async (id: string): Promise<AccountVM[]> => {
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
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<AccountVM[]> => {
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
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
