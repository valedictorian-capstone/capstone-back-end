import { NotFoundException } from '@exceptions';
import { Task } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountRepository, ACCOUNT_REPOSITORIES, TaskRepository } from '@repositories';
import { FirebaseService } from '@services';
import { ACCOUNT_REPOSITORY, FIREBASE_SERVICE, TASK_REPOSITORY } from '@types';
import { TaskCM, TaskUM, TaskVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { FindManyOptions, In } from 'typeorm';

@Injectable()
export class TaskService {

  constructor(
    @Inject(TASK_REPOSITORY) protected readonly taskRepository: TaskRepository,
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[], status?: string): Promise<TaskVM[]> => {
    const queryObj: FindManyOptions = {
      where: {
        id: ids ? { id: In(ids) } : undefined,
        status: status ? { status: status } : undefined,
      }
    }
    return await this.taskRepository.useHTTP()
      .find(queryObj)
      .then((models) => this.mapper.mapArray(models, TaskVM, Task))
  };

  public readonly findById = async (id: string): Promise<TaskVM> => {
    return await this.taskRepository.useHTTP().findOne({ id: id })
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
    return this.taskRepository.useHTTP().save(body)
      .then((model) => {
        //send notification
        this.accountRepository.useHTTP()
          .findOne({ id: body.assigneeId }).then(
            async employee => {
              this.firebaseService.sendNotification({
                data: {
                  id: model.id,
                  title: 'You have a new task',
                  message: `New task code ${model.code} created for you`
                },
                token: employee.deviceId,
              })
            }
          )
        const ids = [];
        ids.push(model.id);
        return this.findAll(ids);
      })
  };

  public readonly update = async (body: TaskUM): Promise<TaskVM[]> => {
    return await this.taskRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.taskRepository.useHTTP()
          .save(body)
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly remove = async (id: string): Promise<TaskVM> => {
    return await this.taskRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.taskRepository.useHTTP()
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
    return await this.taskRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.taskRepository.useHTTP()
          .save({ ...model, isDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<TaskVM[]> => {
    return await this.taskRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.taskRepository.useHTTP()
          .save({ ...model, isDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}