import { NotFoundException } from '@exceptions';
import { Event, Notification } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository, EventRepository, NotificationRepository, TriggerRepository } from '@repositories';
import { CUSTOMER_REPOSITORY, EVENT_REPOSITORY, FIREBASE_SERVICE, NOTIFICATION_REPOSITORY, SOCKET_SERVICE, TRIGGER_REPOSITORY } from '@types';
import { CustomerVM, EventUM, EventVM, NotificationVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { environment } from 'src/environments/environment';
import { uuid } from 'uuidv4';
import { FirebaseService, SocketService } from '../extra-services';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY) protected readonly repository: EventRepository,
    @Inject(CUSTOMER_REPOSITORY) protected readonly customerRepository: CustomerRepository,
    @Inject(TRIGGER_REPOSITORY) protected readonly triggerRepository: TriggerRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly notificationRepository: NotificationRepository,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  public readonly findAll = async (requester?: CustomerVM): Promise<EventVM[]> => {
    return await this.repository.useHTTP().find({  relations: ["groups", "triggers"] })
      .then((models) => {
        if (requester) {
          models = models.filter((event) => event.groups.filter((group) => requester.groups.filter((g) => g.id === group.id).length > 0).length > 0);
        }
        return this.mapper.mapArray(models, EventVM, Event);
      })
  };
  public readonly findById = async (id: string): Promise<EventVM> => {
    return await this.repository.useHTTP().findOne({ where: { id: id }, relations: ['groups', 'triggers'] })
      .then((model) => {
        if (model) {
          model.triggers = model.triggers.sort((a, b) => new Date(a.time) < new Date(b.time) ? -1 : 1);
          return this.mapper.map(model, EventVM, Event);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };
  public readonly save = async (body: EventUM): Promise<EventVM> => {
    const event = { ...body };
    if (event.image && event.image.includes(';base64')) {
      event.image = await this.solveImage(event.image) as any;
    }
    return await this.repository.useHTTP().save(event)
      .then(async (model) => {
        if (body.id) {
          const triggers = await this.triggerRepository.useHTTP().find({ where: { event: model } });
          await this.triggerRepository.useHTTP().remove(triggers);
        } else {
          if (model.groups.length > 0) {
            await this.customerRepository.useHTTP()
            .find({ relations: ['devices', 'groups']}).then(
              async (customers) => {
                customers = customers.filter((customer) => customer.groups.filter((group) => model.groups.filter((g) => g.id === group.id).length > 0).length > 0);
                for (let i = 0; i < customers.length; i++) {
                  const customer = customers[i];
                  await this.notificationRepository.useHTTP().save({
                    body: `New event ${model.name} created ! See now`,
                    title: "You have a new notification",
                    type: 'create',
                    name: 'event',
                    data: (await this.findById(model.id)),
                    icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png',
                    customer: { id: customer.id }
                  }).then(async (notification) => {
                    this.socketService.with('notifications', this.mapper.map(await this.notificationRepository.useHTTP().findOne({ id: notification.id }, { relations: ['customer'] }), NotificationVM, Notification), 'create');
                    if (customer.devices.length > 0) {
                      await this.firebaseService.useSendToDevice(customer.devices.map((e) => e.id), {
                        notification: {
                          body: `New event ${model.name} created ! See now`,
                          title: "You have a new notification",
                          icon: 'https://storage.googleapis.com/m-crm-company.appspot.com/logo-black.png',
                        },
                        // data: (await this.findById(model.id)) as any
                      });
                    }
                  })
                }
              }
            )
          }
        }

        await this.triggerRepository.useHTTP().save(event.triggers.map((trigger) => ({ ...trigger, event: model })));
        const rs = await this.findById(model.id);
        this.socketService.with('events', rs, event.id ? 'update' : 'create');
        return rs;
      })
  };
  public readonly remove = async (id: string): Promise<EventVM> => {
    return await this.repository.useHTTP().findOne({ id: id }, { relations: ['triggers'] })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        await this.triggerRepository.useHTTP().remove(model.triggers);
        return await this.repository.useHTTP()
          .remove(model)
          .then(() => {
            const rs = this.mapper.map({ ...model, id } as Event, EventVM, Event);
            this.socketService.with('events', rs, 'remove');
            return rs;
          })
      });
  };

  private readonly solveImage = async (image: string) => {
    const id = uuid();
    await this.firebaseService.useUploadFileBase64("event/images/" + id + "." + image.substring(image.indexOf("data:image/") + 11, image.indexOf(";base64")), image, image.substring(image.indexOf("data:image/") + 5, image.indexOf(";base64")));
    return environment.firebase.linkDownloadFile + "event/images/" + id + "." + image.substring(image.indexOf("data:image/") + 11, image.indexOf(";base64"));
  }
}
