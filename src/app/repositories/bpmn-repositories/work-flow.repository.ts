import { inject } from 'src/app/extras/functions';
import { CRMRepository } from 'src/app/extras/repositories';
import { WorkFlow } from 'src/app/models';
import { WORK_FLOW_REPOSITORY } from 'src/app/types';

export class WorkFlowRepository extends CRMRepository<WorkFlow> {
  constructor() {
    super(WorkFlow);
  }
  public static readonly inject = inject(WORK_FLOW_REPOSITORY, WorkFlowRepository);
}
