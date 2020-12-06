import { Notification } from '@models';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from '@repositories';
import { NOTIFICATION_REPOSITORY, SOCKET_SERVICE } from '@types';
import { AutoMapper, InjectMapper } from 'nestjsx-automapper';
import { NotificationVM } from 'src/app/view-models';
import { SocketService } from '../extra-services';
@Injectable()
export class NotificationService {

  constructor(
    @InjectMapper() protected readonly mapper: AutoMapper,
    @Inject(NOTIFICATION_REPOSITORY) protected readonly notificationRepository: NotificationRepository,
    @Inject(SOCKET_SERVICE) protected readonly socketService: SocketService
  ) { }

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
          .then(async (model) => {
            const rs = await this.findById(model.id);
            this.socketService.with('notifications', rs, 'update');
            return rs;
          })
      });
  };
  public readonly seenAll = async (ids: string[]): Promise<NotificationVM[]> => {
    const rs = this.mapper.mapArray(await this.notificationRepository.useHTTP().save(ids.map((id) => ({ id, isSeen: true }))), NotificationVM, Notification);
    this.socketService.with('notifications', rs, 'list');
    return rs;
  };
}
