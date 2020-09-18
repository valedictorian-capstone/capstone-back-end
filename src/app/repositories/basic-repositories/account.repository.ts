import { Account } from 'src/app/models';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {


  // public static readonly inject = inject(ACCOUNT_REPOSITORY, AccountRepository);
}
