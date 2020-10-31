import { NotFoundException } from '@exceptions';
import { Task } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountRepository, TaskRepository } from '@repositories';
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
    const whereOption = {};
    if (ids) whereOption['id'] = In(ids);
    if (status) whereOption['status'] = status;
    const queryObj: FindManyOptions = {
      where: whereOption,
      relations: [
        "assignee",
        "assignBy",
        "customer"
      ]
    }
    return await this.taskRepository.useHTTP()
      .find(queryObj)
      .then((models) =>
        this.mapper.mapArray(models, TaskVM, Task)
      )
  };

  public readonly findById = async (id: string): Promise<TaskVM> => {
    return await this.taskRepository.useHTTP().findOne({
      where: {
        id: id
      },
      relations: ["assignee", "assignBy", "customer"],
    })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, TaskVM, Task);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = async (body: TaskCM): Promise<TaskVM> => {
    const assignee = await body.assigneeId ? await this.accountRepository.useHTTP().findOne({ id: body.assigneeId }) : {};
    const assignBy = await body.assigneeById ? await this.accountRepository.useHTTP().findOne({ id: body.assigneeById }) : {};
    return await this.taskRepository.useHTTP().save(
      {
        ...body,
        assignee: assignee,
        assignBy: assignBy
      }
    )
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
        return this.findById(model.id);
      })
  };

  public readonly update = async (body: TaskUM): Promise<TaskVM> => {
    await this.taskRepository.useHTTP().findOne({ id: body.id })
      .then(model => {
        if (!model) {
          throw new NotFoundException(`task id ${body.id} not found`)
        }
      });

    const assignee = await body.assigneeId ? await this.accountRepository.useHTTP().findOne({ id: body.assigneeId }) : {};
    const assignBy = await body.assigneeById ? await this.accountRepository.useHTTP().findOne({ id: body.assigneeById }) : {};
    await this.taskRepository.useHTTP().save(
      {
        ...body,
        assignee: assignee,
        assignBy: assignBy
      }
    ).then(result => {
      //send notification
      this.accountRepository.useHTTP()
        .findOne({ id: body.assigneeId }).then(
          async employee => {
            this.firebaseService.sendNotification({
              data: {
                id: result.id,
                title: 'You have a new task',
                message: `New task code ${result.code} created for you`
              },
              token: employee.deviceId,
            })
          }
        )
    })
    return await this.taskRepository.useHTTP().findOne({ where: { id: body.id }, relations: ["assignee", "assignBy", "customer"] })
      .then(task => {
        return this.mapper.map(task, TaskVM, Task);
      })
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