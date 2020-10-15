import { WFConnectionRepository, WFInstanceRepository, WFRepository, WFStepRepository, WFStepInstanceRepository } from '.';

export * from './wf-connection.repository';
export * from './wf.repository';
export * from './wf-step.repository';
export * from './wf-instance.repository';
export * from './wf-step-instance.repository'

export const BPMN_REPOSITORIES = [
  WFRepository.inject,
  WFConnectionRepository.inject,
  WFStepRepository.inject,
  WFInstanceRepository.inject,
  WFStepInstanceRepository.inject,
];