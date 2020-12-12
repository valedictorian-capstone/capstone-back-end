import { NotFoundException } from '@exceptions';
import { Event } from '@models';
import { Inject, Injectable } from '@nestjs/common';
import { EventRepository, TriggerRepository } from '@repositories';
import { EVENT_REPOSITORY, SOCKET_SERVICE, TRIGGER_REPOSITORY } from '@types';
import { EventUM, EventVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';
import { SocketService } from '../extra-services';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY) protected readonly repository: EventRepository,
    @Inject(TRIGGER_REPOSITORY) protected readonly triggerRepository: TriggerRepository,
    @InjectMapper() protected readonly mapper: AutoMapper,
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
          return this.mapper.map(model, EventVM, Event);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };
  public readonly save = async (body: EventUM): Promise<EventVM> => {
    return await this.repository.useHTTP().save(body)
      .then(async (model) => {
        if (body.id == null) {
          const triggers = await this.triggerRepository.useHTTP().find({ where: { event: model } });
          await this.triggerRepository.useHTTP().remove(triggers);
        }
        await this.triggerRepository.useHTTP().save(body.triggers.map((trigger) => ({ ...trigger, event: model })));
        const rs = await this.findById(model.id);
        this.socketService.with('events', rs, body.id ? 'update' : 'create');
        return rs;
      })
  };
  public readonly remove = async (id: string): Promise<EventVM> => {
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
            const rs = this.mapper.map({...model, id} as Event, EventVM, Event);
            this.socketService.with('events', rs, 'remove');
            return rs;
          })
      });
  };

}
