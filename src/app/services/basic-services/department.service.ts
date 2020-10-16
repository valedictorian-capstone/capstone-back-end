import { NotFoundException } from '@exceptions';
import { Department } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DepartmentRepository } from '@repositories';
import { DEPARTMENT_REPOSITORY } from '@types';
import { DepartmentCM, DepartmentUM, DepartmentVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(DEPARTMENT_REPOSITORY) protected readonly repository: DepartmentRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (): Promise<DepartmentVM[]> => {
    return await this.repository.useHTTP().find({ relations: [ "accountDepartments"] })
      .then((models) => this.mapper.mapArray(models, DepartmentVM, Department))
  };

  public readonly findById = async (id: string): Promise<DepartmentVM> => {
    return await this.repository.useHTTP().findOne({ id: id }, { relations: ["accountDepartments"] })
      .then((model) => {
        console.log(model);
        if (model) {
          return this.mapper.map(model, DepartmentVM, Department);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: DepartmentCM): Promise<DepartmentVM> => {
    return this.repository.useHTTP().save(body as any)
      .then((model) => {
        return this.findById(model.id);
      })
  };

  public readonly update = async (body: DepartmentUM): Promise<DepartmentVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body as any)
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };

  public readonly remove = async (id: string): Promise<DepartmentVM> => {
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

  public readonly active = async (id: string): Promise<DepartmentVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<DepartmentVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then((model) => {
            return this.findById(model.id);
          });
      });
  };
}
