import { NotFoundException } from '@exceptions';
import { Trigger } from '@models';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TriggerRepository } from '@repositories';
import { TRIGGER_REPOSITORY } from '@types';
import { TriggerCM, TriggerUM, TriggerVM } from '@view-models';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { In } from 'typeorm';

@Injectable()
export class TriggerService {
  constructor(
    @Inject(TRIGGER_REPOSITORY) protected readonly repository: TriggerRepository,
    @InjectMapper() protected readonly mapper: AutoMapper
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<TriggerVM[]> => {
    return await this.repository.useHTTP().find({ where: (ids ? { id: In(ids) } : {}), relations: [] })
      .then((models) => this.mapper.mapArray(models, TriggerVM, Trigger))
  };

  public readonly findById = async (id: string): Promise<TriggerVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model) {
          return this.mapper.map(model, TriggerVM, Trigger);
        }
        throw new NotFoundException(
          `Can not find ${id}`,
        );
      })
  };

  public readonly insert = (body: TriggerCM): Promise<TriggerVM> => {
    return this.repository.useHTTP().save(body)
      .then((model) => {
        return this.findById(model.id);
      })
  };

  public readonly update = async (body: TriggerUM): Promise<TriggerVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then(() => {
            return this.findById(model.id);
          })
      });
  };

  public readonly remove = async (id: string): Promise<TriggerVM> => {
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

  public readonly active = async (id: string): Promise<TriggerVM[]> => {
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

  public readonly deactive = async (id: string): Promise<TriggerVM[]> => {
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
