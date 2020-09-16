import {
  WORK_FLOW_CONNECTION_REPOSITORY,
  WORK_FLOW_INSTANCE_REPOSITORY,
  WORK_FLOW_REPOSITORY,
} from 'src/app/constant';

import {
  WorkFlowConnectionRepository,
  WorkFlowInstanceRepository,
  WorkFlowRepository,
} from '../repositories';

export const WorkFlowProviders = {
  provide: WORK_FLOW_REPOSITORY,
  useClass: WorkFlowRepository,
};

export const WorkFlowInstanceProviders = {
  provide: WORK_FLOW_INSTANCE_REPOSITORY,
  useClass: WorkFlowInstanceRepository,
};

export const WorkFlowConnectionProviders = {
  provide: WORK_FLOW_CONNECTION_REPOSITORY,
  useClass: WorkFlowConnectionRepository,
};
