import { ProcessService, ProcessConnectionService, ProcessInstanceService, ProcessStepService, ActivityService } from '.';
export * from './process-connection.service';
export * from './process-instance.service';
export * from './process-step.service';
export * from './process.service';
export * from './activity.service'
export const BPMN_SERVICES = [
  ProcessService,
  ProcessConnectionService,
  ProcessStepService,
  ProcessInstanceService,
  ActivityService,
];