import { ProcessConnectionController, ProcessController, ProcessInstanceController, ActivityController, ProcessStepController } from '.';
export * from './process-step.controller';
export * from './process-instance.controller';
export * from './process.controller';
export * from './process-connection.controller';
export * from './activity.controller'
export const BPMN_CONTROLLERS = [
  ProcessController,
  ProcessConnectionController,
  ProcessStepController,
  ProcessInstanceController,
  ActivityController,
];