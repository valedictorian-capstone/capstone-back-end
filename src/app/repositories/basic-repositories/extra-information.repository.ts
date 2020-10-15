import { ExtraInformation } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { EXTRA_INFORMATION_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class ExtraInformationRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(EXTRA_INFORMATION_REPOSITORY, ExtraInformationRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(ExtraInformation);
  }
}
