import { Notification } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { NOTIFICATION_REPOSITORY } from 'src/app/types/basic-types/notification.type';
import { Connection } from 'typeorm';

export class NotificationRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(NOTIFICATION_REPOSITORY, NotificationRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Notification);
  }
}