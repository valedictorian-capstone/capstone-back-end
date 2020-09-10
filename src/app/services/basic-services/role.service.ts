import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from "sequelize-typescript";
import { Role } from 'src/app/models';
import { CRMService } from 'src/app/extras/services';
import { RoleRepository } from 'src/app/repositories';

@Injectable()
export class RoleService extends CRMService<Role> {
    constructor(@Inject('SEQUELIZE') protected readonly sequelize: Sequelize) {
        super(Role, sequelize);
    }
    public readonly initRepository = () => {
        return new RoleRepository(this.sequelize);
    }

}
