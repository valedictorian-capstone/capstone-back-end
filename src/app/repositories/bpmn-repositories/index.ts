import { ProcessConnectionRepository, ProcessInstanceRepository, ProcessRepository, ProcessStepRepository, ActivityRepository } from '.';

export * from './process-connection.repository';
export * from './process.repository';
export * from './process-step.repository';
export * from './process-instance.repository';
export * from './activity.repository';

export const BPMN_REPOSITORIES = [
  ProcessRepository.inject,
  ProcessConnectionRepository.inject,
  ProcessStepRepository.inject,
  ProcessInstanceRepository.inject,
  ActivityRepository.inject,
];