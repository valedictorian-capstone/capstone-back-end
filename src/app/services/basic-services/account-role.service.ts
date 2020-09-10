import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from "sequelize-typescript";
import { AccountRole } from 'src/app/models';
import { CRMService } from 'src/app/extras/services';
import { AccountRoleRepository } from 'src/app/repositories';

@Injectable()
export class AccountRoleService extends CRMService<AccountRole> {
    constructor(@Inject('SEQUELIZE') protected readonly sequelize: Sequelize) {
        super(AccountRole, sequelize);
    }
    public readonly initRepository = () => {
        return new AccountRoleRepository(this.sequelize);
    }

}
