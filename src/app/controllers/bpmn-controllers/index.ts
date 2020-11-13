import { ProcessConnectionController, ProcessController, ProcessInstanceController, ProcessStepController } from '.';
import { TaskController } from './task.controller';
export * from './process-step.controller';
export * from './process-instance.controller';
export * from './process.controller';
export * from './process-connection.controller';
export * from './task.controller'
export const BPMN_CONTROLLERS = [
  ProcessController,
  ProcessConnectionController,
  ProcessStepController,
  ProcessInstanceController,
  TaskController,
];