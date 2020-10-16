import { WFService, WFConnectionService, WFInstanceService, WFStepInstanceService, WFStepService } from '.';
import { TaskService } from './task.service';
export * from './wf-connection.service';
export * from './wf-instance.service';
export * from './wf-step-instance.service';
export * from './wf-step.service';
export * from './wf.service';
export * from './task.service'
export const BPMN_SERVICES = [
  WFService,
  WFConnectionService,
  WFStepService,
  WFInstanceService,
  WFStepInstanceService,
  TaskService,
];