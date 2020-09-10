import { Sequelize } from 'sequelize-typescript';
import { CRMRepository } from 'src/app/extras/repositories';
import { Account } from 'src/app/models';

export class AccountRepository extends CRMRepository<Account> {
  constructor(protected readonly sequelize: Sequelize) {
    super(Account, sequelize);
  }
}
