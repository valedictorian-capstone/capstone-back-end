import { NotFoundException } from '@exceptions';
import { Activity, Notification } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository, ActivityRepository, NotificationRepository } from '@repositories';
import { FirebaseService, SocketService } from '@services';
import { ACCOUNT_REPOSITORY, ACTIVITY_REPOSITORY, FIREBASE_SERVICE, NOTIFICATION_REPOSITORY, SOCKET_SERVICE } from '@types';
import { AccountVM, ActivityCM, ActivityUM, ActivityVM, NotificationVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class ActivityService {

  constructor(
    @Inject(ACTIVITY_REPOSITORY) protected readonly activityRepository: ActivityRepository,
    @Inject(ACCOUNT_REPOSITORY) protected readonly accountRepository: AccountRepository,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly notificationRepository: NotificationRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  public readonly findAll = async (requester: AccountVM): Promise<ActivityVM[]> => {
    const query = {};
    if (requester.roles.filter((e) => e.canAccessDeal && e.canGetAllActivity).length === 0) {
      query['assignee'] = { id: requester.id };
    }
    return await this.activityRepository.useHTTP()
      .find({where: query})
      .then((models) =>
        this.mapper.mapArray(models, ActivityVM, Activity)
      )
  };
  public readonly findById = async (id: string): Promise<ActivityVM> => {
    return await this.activityRepository.useHTTP().findOne({
      where: {
        id: id
      },
      relations: ["assignee", "assignBy", 'deal'],
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
  public readonly insert = async (body: ActivityCM, requester: AccountVM): Promise<ActivityVM> => {
    return await this.activityRepository.useHTTP().save({ ...body, assignBy: { id: requester.id } } as any)
      .then(async (model) => {
        await this.accountRepository.useHTTP()
          .findOne({ id: body.assignee.id }, { relations: ['devices'] }).then(
            async (employee) => {
              await this.notificationRepository.useHTTP().save({
                body: `New activity ${model.name} created for you`,
                title: "You have a new activity",
                type: 'create',
                name: 'activity',
                data: (await this.findById(model.id)),
                icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png',
                account: { id: employee.id }
              }).then(async (notification) => {
                this.socketService.with('notifications', this.mapper.map(await this.notificationRepository.useHTTP().findOne({ id: notification.id }, { relations: ['account'] }), NotificationVM, Notification), 'create');
                if (employee.devices.length > 0) {
                  await this.firebaseService.useSendToDevice(employee.devices.map((e) => e.id), {
                    notification: {
                      body: `New activity ${model.name} created for you`,
                      title: "You have a new activity",
                      icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png',
                    },
                    // data: (await this.findById(model.id)) as any
                  });
                }
              })
            }
          )
        const rs = await this.findById(model.id);
        this.socketService.with('activitys', rs, 'create');
        return rs;
      })
  };
  public readonly update = async (body: ActivityUM): Promise<ActivityVM> => {
    return await this.activityRepository.useHTTP().findOne({ id: body.id }, { relations: ['assignee'] })
      .then(async data => {
        if (!data) {
          throw new NotFoundException(`activity id ${body.id} not found`)
        }
        return await this.activityRepository.useHTTP().save(body as any).then(async () => {
          const rs = await this.findById(body.id);
          this.socketService.with('activitys', rs, 'update');
          return rs;
        })
      });
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
            const rs = this.mapper.map({ ...model, id } as Activity, ActivityVM, Activity);
            this.socketService.with('activitys', rs, 'remove');
            return rs;
          })
      });
  };

}