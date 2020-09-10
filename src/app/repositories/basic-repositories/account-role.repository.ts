import { Sequelize } from 'sequelize-typescript';
import { CRMRepository } from 'src/app/extras/repositories';
import { AccountRole } from 'src/app/models';

export class AccountRoleRepository extends CRMRepository<AccountRole> {
  constructor(protected readonly sequelize: Sequelize) {
    super(AccountRole, sequelize);
  }
}
