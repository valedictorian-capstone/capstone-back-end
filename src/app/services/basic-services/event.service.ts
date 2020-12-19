import { NotFoundException } from '@exceptions';
import { Event } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { EventRepository, TriggerRepository } from '@repositories';
import { EVENT_REPOSITORY, FIREBASE_SERVICE, SOCKET_SERVICE, TRIGGER_REPOSITORY } from '@types';
import { EventUM, EventVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';
import { FirebaseService, SocketService } from '../extra-services';
import { uuid } from 'uuidv4';
import { environment } from 'src/environments/environment';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY) protected readonly repository: EventRepository,
    @Inject(TRIGGER_REPOSITORY) protected readonly triggerRepository: TriggerRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(FIREBASE_SERVICE) protected readonly firebaseService: FirebaseService,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }
  public readonly findAll = async (ids?: string[]): Promise<EventVM[]> => {
    return await this.repository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["groups", "triggers"] })
      .then((models) => this.mapper.mapArray(models, EventVM, Event))
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
        if (event.id == null) {
          const triggers = await this.triggerRepository.useHTTP().find({ where: { event: model } });
          await this.triggerRepository.useHTTP().remove(triggers);
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
