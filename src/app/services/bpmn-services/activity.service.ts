import { NotFoundException } from '@exceptions';
import { Activity } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountRepository, NotificationRepository, ActivityRepository } from '@repositories';
import { FirebaseService } from '@services';
import { ACCOUNT_REPOSITORY, FIREBASE_SERVICE, NOTIFICATION_REPOSITORY, ACTIVITY_REPOSITORY } from '@types';
import { ActivityCM, ActivityUM, ActivityVM } from '@view-models';
import { verify } from 'jsonwebtoken';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { FindManyOptions, In } from 'typeorm';

@Injectable()
export class ActivityService {

  constructor(
    @Inject(ACTIVITY_REPOSITORY) protected readonly activityRepository: ActivityRepository,
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly notificationRepository: NotificationRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[], status?: string): Promise<ActivityVM[]> => {
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
    return await this.activityRepository.useHTTP()
      .find(queryObj)
      .then((models) =>
        this.mapper.mapArray(models, ActivityVM, Activity)
      )
  };

  public readonly findById = async (id: string): Promise<ActivityVM> => {
    return await this.activityRepository.useHTTP().findOne({
      where: {
        id: id
      },
      relations: ["assignee", "assignBy", "processStepInstance"],
    })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, ActivityVM, Activity);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = async (body: ActivityCM, token: string): Promise<ActivityVM> => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const account = Object.assign(decoded.valueOf()).account;
    return await this.activityRepository.useHTTP().save({ ...body, assignBy: account } as any )
      .then(async (model)  => {
        //send notification
        await this.accountRepository.useHTTP()
          .findOne({ id: body.assignee.id }, { relations: ['devices'] }).then(
            async employee => {
              const noti = {
                notification: {
                  body: `New activity code ${model.name} created for you`,
                  title: "You have a new activity",
                },
                data: {
                  id: model.id,
                  // url: `core/instance/${body.processStepInstance.processInstance.id}`,
                },
                account: employee,
                type: 'activity',
                isSeen: false
              }

              await this.notificationRepository.useHTTP().save(noti).then(async (notifi) => {
                for (const device of employee.devices) {
                  await this.firebaseService.useSendToDevice(device.id, {
                    notification: notifi.notification,
                    data: {
                      noti: JSON.stringify({ ...notifi, account: employee }),
                    },
                  });
                }
              })
            }
          )
        return this.findById(model.id);
      })
  };

  public readonly update = async (body: ActivityUM): Promise<ActivityVM> => {
    await this.activityRepository.useHTTP().findOne({ id: body.id })
      .then(model => {
        if (!model) {
          throw new NotFoundException(`activity id ${body.id} not found`)
        }
      });

    await this.activityRepository.useHTTP().save(body as any).then(model => {
      this.accountRepository.useHTTP()
        .findOne({ id: body.assignee.id }, { relations: ['devices'] }).then(
          async employee => {
            const noti = {
              notification: {
                body: `New activity code ${model.name} created for you`,
                title: "You have a new activity",
              },
              data: {
                id: model.id,
                // url: `core/instance/${body.processInstance.id}`,
              },
              account: employee,
              type: 'activity',
              isSeen: false
            }

            await this.notificationRepository.useHTTP().save(noti).then(async (notifi) => {
              await this.firebaseService.useSendToDevice(employee.devices.map((e) => e.id), {
                notification: notifi.notification,
                data: {
                  noti: JSON.stringify({ ...notifi, account: employee }),
                },
              });
            })
          }
        )
    })
    return this.findById(body.id);
  };

  public readonly remove = async (id: string): Promise<ActivityVM> => {
    return await this.activityRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.activityRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<ActivityVM[]> => {
    return await this.activityRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.activityRepository.useHTTP()
          .save({ ...model, isDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<ActivityVM[]> => {
    return await this.activityRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.activityRepository.useHTTP()
          .save({ ...model, isDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}