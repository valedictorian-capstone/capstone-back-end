import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from "sequelize-typescript";
import { WorkFlowConnection } from 'src/app/models';
import { CRMService } from 'src/app/extras/services';
import { WorkFlowConnectionRepository } from 'src/app/repositories';

@Injectable()
export class WorkFlowConnectionService extends CRMService<WorkFlowConnection> {
    constructor(@Inject('SEQUELIZE') protected readonly sequelize: Sequelize) {
        super(WorkFlowConnection, sequelize);
    }
    public readonly initRepository = () => {
        return new WorkFlowConnectionRepository(this.sequelize);
    }

}
