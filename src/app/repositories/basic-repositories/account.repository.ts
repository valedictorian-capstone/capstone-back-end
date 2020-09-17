import { inject } from 'src/app/extras/functions';
import { CRMRepository } from 'src/app/extras/repositories';
import { Account } from 'src/app/models';
import { ACCOUNT_REPOSITORY } from 'src/app/types';

export class AccountRepository extends CRMRepository<Account> {
  constructor() {
    super(Account);
  }
  public static readonly inject = inject(ACCOUNT_REPOSITORY, AccountRepository);
}
