import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from "sequelize-typescript";
import { WorkFlow } from 'src/app/models';
import { CRMService } from 'src/app/extras/services';
import { WorkFlowRepository } from 'src/app/repositories';

@Injectable()
export class WorkFlowService extends CRMService<WorkFlow> {
    constructor(@Inject('SEQUELIZE') protected readonly sequelize: Sequelize) {
        super(WorkFlow, sequelize);
    }
    public readonly initRepository = () => {
        return new WorkFlowRepository(this.sequelize);
    }

}
