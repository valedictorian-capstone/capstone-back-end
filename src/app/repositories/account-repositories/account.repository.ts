import { Account } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { ACCOUNT_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class AccountRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(ACCOUNT_REPOSITORY, AccountRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Account);
  }
}
