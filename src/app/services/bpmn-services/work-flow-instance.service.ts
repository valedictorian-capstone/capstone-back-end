import { Injectable, Inject } from '@nestjs/common';
import { Sequelize } from "sequelize-typescript";
import { WorkFlowInstance } from 'src/app/models';
import { CRMService } from 'src/app/extras/services';
import { WorkFlowInstanceRepository } from 'src/app/repositories';

@Injectable()
export class WorkFlowInstanceService extends CRMService<WorkFlowInstance> {
    constructor(@Inject('SEQUELIZE') protected readonly sequelize: Sequelize) {
        super(WorkFlowInstance, sequelize);
    }
    public readonly initRepository = () => {
        return new WorkFlowInstanceRepository(this.sequelize);
    }

}
