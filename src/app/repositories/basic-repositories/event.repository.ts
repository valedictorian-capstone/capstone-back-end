import { Event } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { EVENT_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class EventRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(EVENT_REPOSITORY, EventRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Event);
  }
}
