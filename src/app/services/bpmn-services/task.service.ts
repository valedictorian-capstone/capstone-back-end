import { Task } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TaskRepository } from '@repositories';
import { TASK_REPOSITORY } from '@types';
import { TaskCM, TaskUM, TaskVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotFoundException } from '@exceptions';
import { FindManyOptions, In } from 'typeorm';

@Injectable()
export class TaskService {

  constructor(
    @Inject(TASK_REPOSITORY) protected readonly repository: TaskRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[], status?: string): Promise<TaskVM[]> => {
    const queryObj: FindManyOptions = {
      where: {
        id: ids ? { id: In(ids) } : undefined,
        status: status ? { status: status } : undefined,
      }
    }
    return await this.repository.useHTTP()
      .find(queryObj)
      .then((models) => this.mapper.mapArray(models, TaskVM, Task))
  };

  public readonly findById = async (id: string): Promise<TaskVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, TaskVM, Task);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: TaskCM): Promise<TaskVM[]> => {
    return this.repository.useHTTP().save(body as any)
      .then((model) => {
        const ids = [];
        ids.push(model.id);
        return this.findAll(ids);
      })
  };

  public readonly update = async (body: TaskUM): Promise<TaskVM[]> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly remove = async (id: string): Promise<TaskVM> => {
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

  public readonly active = async (id: string): Promise<TaskVM[]> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, isDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<TaskVM[]> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, isDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}