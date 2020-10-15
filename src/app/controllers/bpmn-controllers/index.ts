import { WFConnectionController, WFController, WFInstanceController, WFStepInstanceController, WFStepController } from '.';
export * from './wf-step.controller';
export * from './wf-instance.controller';
export * from './wf-step-instance.controller';
export * from './wf.controller';
export * from './wf-connection.controller';
export const BPMN_CONTROLLERS = [
  WFController,
  WFConnectionController,
  WFStepController,
  WFInstanceController,
  WFStepInstanceController,
];