import { WFConnectionController, WFController, WFInstanceController, WFStepInstanceController, WFStepController } from '.';
import { TaskController } from './task.controller';
export * from './wf-step.controller';
export * from './wf-instance.controller';
export * from './wf-step-instance.controller';
export * from './wf.controller';
export * from './wf-connection.controller';
export * from './task.controller'
export const BPMN_CONTROLLERS = [
  WFController,
  WFConnectionController,
  WFStepController,
  WFInstanceController,
  WFStepInstanceController,
  TaskController,
];