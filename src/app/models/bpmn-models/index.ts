import { Process, ProcessCondition, ProcessConnection, ProcessInstance, ProcessStep, ProcessStepInstance, Task } from '.';

export * from './process.model';
export * from './process-condition.model';
export * from './process-connection.model';
export * from './process-instance.model';
export * from './process-step-instance.model';
export * from './process-step.model';
export * from './task.model'

export const BPMN_MODELS = [Process, ProcessCondition, ProcessConnection, ProcessInstance, ProcessStep, ProcessStepInstance, Task];