import { AccountExtraInformation } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { ACCOUNT_EXTRA_INFORMATION_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class AccountExtraInformationRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(ACCOUNT_EXTRA_INFORMATION_REPOSITORY, AccountExtraInformationRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(AccountExtraInformation);
  }
}
