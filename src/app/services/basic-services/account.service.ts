import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from "sequelize-typescript";
import { Account } from 'src/app/models';
import { CRMService } from 'src/app/extras/services';
import { AccountRepository } from 'src/app/repositories';

@Injectable()
export class AccountService extends CRMService<Account> {
    constructor(@Inject('SEQUELIZE') protected readonly sequelize: Sequelize) {
        super(Account, sequelize);
    }
    public readonly initRepository = () => {
        return new AccountRepository(this.sequelize);
    }

}
