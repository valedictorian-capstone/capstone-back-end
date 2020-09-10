import { Sequelize } from 'sequelize-typescript';
import { CRMRepository } from 'src/app/extras/repositories';
import { WorkFlowConnection } from 'src/app/models';

export class WorkFlowConnectionRepository extends CRMRepository<WorkFlowConnection> {
  constructor(protected readonly sequelize: Sequelize) {
    super(WorkFlowConnection, sequelize);
  }
}
