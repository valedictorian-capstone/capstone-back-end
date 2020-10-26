import { FeedBack } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { FEEDBACK_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class FeedBackRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(FEEDBACK_REPOSITORY, FeedBackRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(FeedBack);
  }
}
