import { inject } from 'src/app/extras/functions';
import { CRMRepository } from 'src/app/extras/repositories';
import { WorkFlowConnection } from 'src/app/models';
import { WORK_FLOW_CONNECTION_REPOSITORY } from 'src/app/types';

export class WorkFlowConnectionRepository extends CRMRepository<WorkFlowConnection> {
  constructor() {
    super(WorkFlowConnection);
  }
  public static readonly inject = inject(WORK_FLOW_CONNECTION_REPOSITORY, WorkFlowConnectionRepository);
}
