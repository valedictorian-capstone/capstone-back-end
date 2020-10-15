import { WF, WFCondition, WFConnection, WFInstance, WFStep, WFStepInstance } from '.';

export * from './wf.model';
export * from './wf-condition.model';
export * from './wf-connection.model';
export * from './wf-instance.model';
export * from './wf-step-instance.model';
export * from './wf-step.model';

export const BPMN_MODELS = [WF, WFCondition, WFConnection, WFInstance, WFStep, WFStepInstance];