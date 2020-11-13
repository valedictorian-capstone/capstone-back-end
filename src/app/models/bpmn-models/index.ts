import { Process, ProcessCondition, ProcessConnection, ProcessInstance, ProcessStep, Activity } from '.';

export * from './process.model';
export * from './process-condition.model';
export * from './process-connection.model';
export * from './process-instance.model';
export * from './process-step.model';
export * from './activity.model'

export const BPMN_MODELS = [Process, ProcessCondition, ProcessInstance, ProcessStep, ProcessConnection, Activity];
