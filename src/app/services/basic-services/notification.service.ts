import { Notification } from '@models';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from '@repositories';
import { NOTIFICATION_REPOSITORY } from '@types';
import { verify } from 'jsonwebtoken';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotificationCM, NotificationUM, NotificationVM } from 'src/app/view-models';
@Injectable()
export class NotificationService {

  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly notificationRepository: NotificationRepository
  ) { }

  public readonly findAll = async (token: string): Promise<NotificationVM[]> => {
    const decoded = verify(token + "", 'vzicqoasanQhtZicTmeGsBpacNomny', { issuer: 'crm', subject: 'se20fa27' });
    const account = Object.assign(decoded.valueOf()).account;
    return await this.notificationRepository.useHTTP().find({ where: { account }, relations: ['account'] })
      .then((models) => this.mapper.mapArray(models, NotificationVM, Notification))
  };

  public readonly findById = async (id: string): Promise<NotificationVM> => {
    return await this.notificationRepository.useHTTP().findOne({ id: id })
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
    return this.notificationRepository.useHTTP().save(body)
      .then((model) => {
        return this.findById(model.id);
      })
      .catch(err => err);
  };

  public readonly update = async (body: NotificationUM): Promise<NotificationVM> => {
    return await this.notificationRepository.useHTTP().findOne({ id: body.id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${body.id}`,
          );
        }
        return await this.notificationRepository.useHTTP()
          .save(body)
          .then((model) => {
            return this.findById(model.id);
          })
          .catch()
      });
  };

  public readonly remove = async (id: string): Promise<NotificationVM> => {
    return await this.notificationRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.notificationRepository.useHTTP()
          .remove(model)
          .then(() => {
            throw new HttpException(
              `Remove information of ${id} successfully !!!`,
              HttpStatus.NO_CONTENT,
            );
          })
      });
  };

  public readonly seen = async (id: string): Promise<NotificationVM> => {
    return await this.notificationRepository.useHTTP().findOne({ id: id })
      .then(async (model) => {
        if (!model) {
          throw new NotFoundException(
            `Can not find ${id}`,
          );
        }
        return await this.notificationRepository.useHTTP()
          .save({ ...model, isSeen: true })
          .then((model) => {
            return this.findById(model.id);
          })
      });
  };
  public readonly seenAll = async (ids: string[], token: string): Promise<NotificationVM[]> => {
    return await this.notificationRepository.useHTTP()
      .save(ids.map((id) => ({ id, isSeen: true })))
      .then(() => {
        return this.findAll(token);
      });
  };
}
