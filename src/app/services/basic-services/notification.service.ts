import { Notification } from '@models';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from '@repositories';
import { NOTIFICATION_REPOSITORY } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotificationCM, NotificationUM, NotificationVM } from 'src/app/view-models';
import { In } from 'typeorm';
@Injectable()
export class NotificationService {

  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly repository: NotificationRepository
  ) { }

  public readonly findAll = async (ids?: string[]): Promise<NotificationVM[]> => {
    return await this.repository.useHTTP().find(ids ? { id: In(ids) } : {})
      .then((models) => this.mapper.mapArray(models, NotificationVM, Notification))
  };

  public readonly findById = async (id: string): Promise<NotificationVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then((model) => {
        if (model !== null) {
          return this.mapper.map(model, NotificationVM, Notification);
        }
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
      })
  };

  public readonly insert = (body: NotificationCM): Promise<NotificationVM> => {
    return this.repository.useHTTP().save(body)
      .then((model) => {
        return this.findById(model.id);
      })
      .catch(err => err);
  };

  public readonly update = async (body: NotificationUM): Promise<NotificationVM> => {
    return await this.repository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.repository.useHTTP()
          .save(body)
          .then((model) => {
            return this.findById(model.id);
          })
          .catch()
      });
  };

  public readonly remove = async (id: string): Promise<NotificationVM> => {
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

  public readonly active = async (id: string): Promise<NotificationVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: false })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };

  public readonly deactive = async (id: string): Promise<NotificationVM> => {
    return await this.repository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.repository.useHTTP()
          .save({ ...model, IsDelete: true })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };
}
