import { Activity } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { ACTIVITY_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class ActivityRepository {
    constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
    }
    public static readonly inject = inject(ACTIVITY_REPOSITORY, ActivityRepository);
    public readonly useHTTP = () => {
      return this.connection.getRepository(Activity);
    }
  }