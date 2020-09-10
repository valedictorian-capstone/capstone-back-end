import { Sequelize } from 'sequelize-typescript';
import { CRMRepository } from 'src/app/extras/repositories';
import { WorkFlow } from 'src/app/models';

export class WorkFlowRepository extends CRMRepository<WorkFlow> {
  constructor(protected readonly sequelize: Sequelize) {
    super(WorkFlow, sequelize);
  }
}
