import { ProcessService, ProcessConnectionService, ProcessInstanceService, ProcessStepService } from '.';
import { TaskService } from './task.service';
export * from './process-connection.service';
export * from './process-instance.service';
export * from './process-step.service';
export * from './process.service';
export * from './task.service'
export const BPMN_SERVICES = [
  ProcessService,
  ProcessConnectionService,
  ProcessStepService,
  ProcessInstanceService,
  TaskService,
];