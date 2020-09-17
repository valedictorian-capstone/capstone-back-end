import { inject } from 'src/app/extras/functions';
import { CRMRepository } from 'src/app/extras/repositories';
import { WorkFlowInstance } from 'src/app/models';
import { WORK_FLOW_INSTANCE_REPOSITORY } from 'src/app/types';

export class WorkFlowInstanceRepository extends CRMRepository<WorkFlowInstance> {
  constructor() {
    super(WorkFlowInstance);
  }
  public static readonly inject = inject(WORK_FLOW_INSTANCE_REPOSITORY, WorkFlowInstanceRepository);
}
