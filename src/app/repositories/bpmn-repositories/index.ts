import { DealRepository, StageRepository, ActivityRepository, ProcessRepository, DealDetailRepository } from '.';

export * from './stage.repository';
export * from './deal.repository';
export * from './activity.repository';
export * from './process.repository'
export * from './deal-detail.repository'

export const BPMN_REPOSITORIES = [
  StageRepository.inject,
  DealRepository.inject,
  ActivityRepository.inject,
  ProcessRepository.inject,
  DealDetailRepository.inject
];