import { InjectRepository } from '@nestjs/typeorm';
import { inject } from 'src/app/extras/functions';
import { Account } from 'src/app/models';
import { ACCOUNT_REPOSITORY } from 'src/app/types';
import { Repository } from 'typeorm';

export class AccountRepository extends Repository<Account> {
  constructor() {
    super();
  }

  public static readonly inject = inject(ACCOUNT_REPOSITORY, AccountRepository);
}
