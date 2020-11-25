import { NotFoundException } from '@exceptions';
import { Event } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { EventRepository, TriggerRepository } from '@repositories';
import { EVENT_REPOSITORY, TRIGGER_REPOSITORY } from '@types';
import { EventUM, EventVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY) protected readonly repository: EventRepository,
    @Inject(TRIGGER_REPOSITORY) protected readonly triggerRepository: TriggerRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<EventVM[]> => {
    return await this.repository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: ["groups", "triggers"] })
      .then((models) => this.mapper.mapArray(models, EventVM, Event))
  };

  public readonly findById = async (id: string): Promise<EventVM> => {
    return await this.repository.useHTTP().findOne({ where: {id: id}, relations: ['groups', 'triggers'] })
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
      await this.triggerRepository.useHTTP().save(body.triggers.map((trigger) => ({...trigger, event: model})));
      return await this.findById(model.id);
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
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly active = async (id: string): Promise<EventVM[]> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<EventVM[]> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then(() => {
            const ids = [];
            ids.push(model.id);
            return this.findAll(ids);
          })
      });
  };
}
