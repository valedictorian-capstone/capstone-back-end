import { NotFoundException } from '@exceptions';
import { Account } from '@models';
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository, RoleRepository } from '@repositories';
import { ACCOUNT_REPOSITORY, ROLE_REPOSITORY } from '@types';
import { AccountCM, AccountFilter, AccountUM, AccountVM } from '@view-models';
import { hashSync } from 'bcrypt';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(ROLE_REPOSITORY) protected readonly roleRepository: RoleRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    private readonly jwtService: JwtService
  ) { }

  public readonly findAll = async (accountFilter: AccountFilter): Promise<AccountVM[]> => {
    if (accountFilter?.roleName) {
      return await this.findByRole(accountFilter.roleName);
    } else if (accountFilter?.departmentId) {
      return await this.findByDepartment(accountFilter?.departmentId)
    } else {
      return await this.mapper.mapArray(await this.accountRepository.useHTTP()
        .find({ relations: ["accountDepartments", "roles"] }), AccountVM, Account);
    }
  };

  private readonly findByDepartment = async (departmentId: string): Promise<AccountVM[]> => {
    return await this.accountRepository.useHTTP().createQueryBuilder('account')
      .leftJoinAndSelect('account.accountDepartments', 'accountDepartment')
      .leftJoinAndSelect('account.roles', 'role')
      .where('accountDepartment.id = :id', { id: departmentId })
      .getMany()
      .then(async (models) => {
        return this.mapper.mapArray(models, AccountVM, Account)
      });
  }

  public readonly findByRole = async (roleName: string): Promise<AccountVM[]> => {
    return await this.accountRepository.useHTTP().createQueryBuilder('account')
      .leftJoinAndSelect('account.roles', 'role')
      .leftJoinAndSelect('account.accountDepartments', 'accountDepartment')
      .where('role.name= :name', { name: roleName })
      .getMany()
      .then(async (models) => {
        return this.mapper.mapArray(models, AccountVM, Account)
      });
  }


  public readonly findById = async (id: string): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().findOne({ where: { id: id }, relations: ["accountDepartments", "roles"] })
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

  public readonly checkUnique = async (label: string, value: string): Promise<boolean> => {
    const query = { [label]: value };
    return this.accountRepository.useHTTP().findOne({ where: query })
      .then((model) => {
        return model ? true : false;
      })
  }

  public readonly import = async (body: AccountCM[]): Promise<any> => {
    return await this.accountRepository.useHTTP().save(body).then(async (accounts) => {
      return await this.mapper.mapArray(
        await this.accountRepository.useHTTP().find({ id: In(accounts.map(e => e.id)) }), AccountVM, Account);
    });
  };

  public readonly insert = async (body: AccountCM): Promise<AccountVM> => {
    return await this.accountRepository.useHTTP().save({ ...body, password: hashSync(body.password, 10) }).then(async (account) => {
      return await this.findById(account.id);
    });
  };

  public readonly update = async (body: AccountUM): Promise<AccountVM> => {
    if (!body?.id) {
      throw new BadRequestException(
        `Id param is missing`,
      );
    }
    return await this.accountRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        } else {
          await this.accountRepository.useHTTP().remove({ ...body } as any);
          return await this.accountRepository.useHTTP().save(body).then(async (account) => {
            return await this.findById(account.id);
          })
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
          .then(async () => {
            return this.mapper.map(await this.accountRepository.useHTTP().findOne({ id: id }), AccountVM, Account);
          })
      });
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
          .then(async () => {
            return this.mapper.map(await this.accountRepository.useHTTP().findOne({ id: id }), AccountVM, Account);
          })
      });
  };
}
