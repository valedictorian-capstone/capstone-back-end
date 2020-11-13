import { ProcessConnectionRepository, ProcessInstanceRepository, ProcessRepository, ProcessStepRepository, TaskRepository } from '.';

export * from './process-connection.repository';
export * from './process.repository';
export * from './process-step.repository';
export * from './process-instance.repository';
export * from './task.repository'

export const BPMN_REPOSITORIES = [
  ProcessRepository.inject,
  ProcessConnectionRepository.inject,
  ProcessStepRepository.inject,
  ProcessInstanceRepository.inject,
  TaskRepository.inject,
];