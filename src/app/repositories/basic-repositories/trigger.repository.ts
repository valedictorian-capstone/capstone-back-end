import { Trigger } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { TRIGGER_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class TriggerRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(TRIGGER_REPOSITORY, TriggerRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Trigger);
  }
}
