import { InvalidException, NotFoundException } from '@exceptions';
import { AccountDepartment } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountDepartmentRepository, AccountRepository, DepartmentRepository } from '@repositories';
import { ACCOUNT_DEPARTMENT_REPOSITORY, ACCOUNT_REPOSITORY, DEPARTMENT_REPOSITORY } from '@types';
import { AccountDepartmentCM, AccountDepartmentUM, AccountDepartmentVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class AccountDepartmentService {
  constructor(
    @Inject(ACCOUNT_DEPARTMENT_REPOSITORY) protected readonly accountDepartmentRepository: AccountDepartmentRepository,
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(DEPARTMENT_REPOSITORY) protected readonly departmentRepository: DepartmentRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<AccountDepartmentVM[]> => {
    return await this.accountDepartmentRepository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["account", "department"] })
      .then(async (models) => {
        return this.mapper.mapArray(models, AccountDepartmentVM, AccountDepartment)
      }).catch((err) => {
        console.log(err);
        throw new InvalidException(err);
      });
  };

  public readonly findById = async (id: string): Promise<AccountDepartmentVM> => {
    return await this.accountDepartmentRepository.useHTTP().findOne({ where: { id: id }, relations: [] })
      .then(async (model) => {
        if (model) {
          return this.mapper.map(model, AccountDepartmentVM, AccountDepartment);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = async (body: AccountDepartmentCM): Promise<AccountDepartmentVM> => {
    return await this.accountDepartmentRepository.useHTTP().save(body).then(async (model) => {
      const account = await this.accountRepository.useHTTP().findOne(body.account.id);
      const department = await this.departmentRepository.useHTTP().findOne(body.department.id);
      await this.accountDepartmentRepository.useHTTP().save({...model, account: account, department: department})
      return await this.findById(model.id);
    }).catch(err => err);
  };

  public readonly update = async (body: AccountDepartmentUM): Promise<AccountDepartmentVM> => {
    return await this.accountDepartmentRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }else{
          return await this.accountDepartmentRepository.useHTTP().save(body).then(async (model) => {
            return await this.findById(model.id);
          }).catch(err => err);
        } 
      });
  };

  public readonly remove = async (id: string): Promise<AccountDepartmentVM> => {
    return await this.accountDepartmentRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.accountDepartmentRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<AccountDepartmentVM[]> => {
    return await this.accountDepartmentRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.accountDepartmentRepository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<AccountDepartmentVM[]> => {
    return await this.accountDepartmentRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.accountDepartmentRepository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
