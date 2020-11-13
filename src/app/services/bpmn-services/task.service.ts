import { NotFoundException } from '@exceptions';
import { Task } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountRepository, NotificationRepository, TaskRepository } from '@repositories';
import { FirebaseService } from '@services';
import { ACCOUNT_REPOSITORY, FIREBASE_SERVICE, NOTIFICATION_REPOSITORY, TASK_REPOSITORY } from '@types';
import { TaskCM, TaskUM, TaskVM } from '@view-models';
import { verify } from 'jsonwebtoken';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { FindManyOptions, In } from 'typeorm';

@Injectable()
export class TaskService {

  constructor(
    @Inject(TASK_REPOSITORY) protected readonly taskRepository: TaskRepository,
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly notificationRepository: NotificationRepository,
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
      relations: ["assignee", "assignBy", "processStepInstance"],
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

  public readonly insert = async (body: TaskCM, token: string): Promise<TaskVM> => {
    return await this.taskRepository.useHTTP().save(body)
      .then(async (model) => {
        //send notification
        await this.accountRepository.useHTTP()
          .findOne({ id: body.assignee.id }).then(
            async employee => {
              const noti = {
                notification: {
                  body: `New task code ${model.name} created for you`,
                  title: "You have a new task",
                },
                data: {
                  id: model.id,
                  // url: `core/instance/${body.processStepInstance.processInstance.id}`,
                },
                account: employee,
                type: 'task',
                isSeen: false
              }
              await this.notificationRepository.useHTTP().save(noti).then(async (notifi) => {
                const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
                const account = Object.assign(decoded.valueOf()).account;
                await this.firebaseService.useSendToDevice(employee.deviceId, {
                  notification: notifi.notification,
                  data: {
                    noti: JSON.stringify({ ...notifi, account: employee }),
                  },
                });
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

    await this.taskRepository.useHTTP().save(body).then(result => {
      this.accountRepository.useHTTP()
        .findOne({ id: body.assignee.id }).then(
          async employee => {
            this.firebaseService.useSendToDevice(employee.deviceId, {
              notification: {
                body: "`New task code ${result.name} created for you",
                title: "You have a new task",
              },
              data: {
                id: result.id,
                title: 'You have a new task',
                message: `New task code ${result.name} created for you`
              },
            });
          }
        )
    })
    return this.findById(body.id);
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