import { Pattern } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { PATTERN_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class PatternRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PATTERN_REPOSITORY, PatternRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Pattern);
  }
}
