import { ACCOUNT_ROLE_REPOSITORY } from 'src/app/types';
import { CRMRepository } from 'src/app/extras/repositories';
import { AccountRole } from 'src/app/models';
import { inject } from 'src/app/extras/functions';

export class AccountRoleRepository extends CRMRepository<AccountRole> {
  constructor() {
    super(AccountRole);
  }
  public static readonly inject = inject(ACCOUNT_ROLE_REPOSITORY, AccountRoleRepository);
}
