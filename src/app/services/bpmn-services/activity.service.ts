import { NotFoundException } from '@exceptions';
import { Activity, Notification } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { EmployeeRepository, ActivityRepository, LogRepository, NotificationRepository } from '@repositories';
import { FirebaseService, SocketService } from '@services';
import { EMPLOYEE_REPOSITORY, ACTIVITY_REPOSITORY, FIREBASE_SERVICE, LOG_REPOSITORY, NOTIFICATION_REPOSITORY, SOCKET_SERVICE } from '@types';
import { EmployeeVM, ActivityCM, ActivityUM, ActivityVM, NotificationVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';

@Injectable()
export class ActivityService {

  constructor(
    @Inject(ACTIVITY_REPOSITORY) protected readonly activityRepository: ActivityRepository,
    @Inject(EMPLOYEE_REPOSITORY) protected readonly employeeRepository: EmployeeRepository,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly notificationRepository: NotificationRepository,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService,
    @Inject(LOG_REPOSITORY) protected readonly logRepository: LogRepository,
  ) { }
  public readonly findAll = async (requester: EmployeeVM): Promise<ActivityVM[]> => {
    const query = {};
    if (requester.roles.filter((e) => e.canAccessDeal && e.canGetAllActivity).length === 0) {
      query['assignee'] = { id: requester.id };
    }
    return await this.activityRepository.useHTTP()
      .find({ where: query, relations: ['assignee', 'deal', 'assignBy', 'campaign'] })
      .then((models) =>
        this.mapper.mapArray(models, ActivityVM, Activity)
      )
  };
  public readonly findById = async (id: string): Promise<ActivityVM> => {
    return await this.activityRepository.useHTTP().findOne({
      where: {
        id: id
      },
      relations: ["assignee", "assignBy", 'deal', 'campaign'],
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
  public readonly query = async (key: string, id: string): Promise<ActivityVM[]> => {
    return await this.activityRepository.useHTTP().find({
      where: key && id ? {
        [key]: { id }
      } : {},
      relations: ["assignee", "assignBy", 'deal', 'campaign'],
    })
      .then((models) => {
        return this.mapper.mapArray(models, ActivityVM, Activity);
      })
  };
  public readonly insert = async (body: ActivityCM, requester: EmployeeVM): Promise<ActivityVM> => {
    return await this.activityRepository.useHTTP().save({ ...body, assignBy: { id: requester.id } } as any)
      .then(async (model) => {
        await this.employeeRepository.useHTTP()
          .findOne({ id: body.assignee.id }, { relations: ['devices'] }).then(
            async (employee) => {
              await this.notificationRepository.useHTTP().save({
                body: `New activity ${model.name} created for you`,
                title: "You have a new activity",
                type: 'create',
                name: 'activity',
                data: (await this.findById(model.id)),
                icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png',
                employee: { id: employee.id }
              }).then(async (notification) => {
                this.socketService.with('notifications', this.mapper.map(await this.notificationRepository.useHTTP().findOne({ id: notification.id }, { relations: ['employee'] }), NotificationVM, Notification), 'create');
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
        this.saveLog({
          description: 'Create new activity ' + model.name,
          deal: rs.deal ? { id: rs.deal.id } : undefined,
          campaign: rs.campaign ? { id: rs.campaign.id } : undefined,
        });
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
          this.saveLog({
            description: 'Update an activity ' + rs.name,
            deal: rs.deal ? { id: rs.deal.id } : undefined,
            campaign: rs.campaign ? { id: rs.campaign.id } : undefined,
          });
          this.socketService.with('activitys', rs, 'update');
          return rs;
        })
      });
  };
  public readonly remove = async (id: string): Promise<ActivityVM> => {
    return await this.activityRepository.useHTTP().findOne({ id: id }, { relations: ['deal', 'campaign'] })
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
            this.saveLog({
              description: 'Remove an activity ' + rs.name,
              deal: rs.deal ? { id: rs.deal.id } : undefined,
              campaign: rs.campaign ? { id: rs.campaign.id } : undefined,
            });
            this.socketService.with('activitys', rs, 'remove');
            return rs;
          })
      });
  };
  public readonly removeMany = async (body: ActivityVM[]): Promise<ActivityVM[]> => {
    return await this.activityRepository.useHTTP()
    .remove(body.map((e) => ({id: e.id})) as any)
      .then(async () => {
      for (let i = 0; i < body.length; i++) {
        const model = body[i];
        await this.saveLog({
          description: 'Remove an activity ' + model.name,
          deal: model.deal ? { id: model.deal.id } : undefined,
          campaign: model.campaign ? { id: model.campaign.id } : undefined,
        });
        this.socketService.with('activitys', model, 'remove');
      }
      return body;
    })
  };
  private readonly saveLog = async (data: { description: string, deal?: { id: string }, campaign?: { id: string } }) => {
    await this.logRepository.useHTTP().save(data as any).then(async (res) => {
      this.socketService.with('logs', await this.logRepository.useHTTP().findOne({ id: res.id }, { relations: ['deal', 'campaign'] }), 'create');
    });
  }

}