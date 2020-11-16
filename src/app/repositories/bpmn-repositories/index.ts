import { DealRepository, StageRepository, ActivityRepository, PipelineRepository, DealDetailRepository } from '.';

export * from './stage.repository';
export * from './deal.repository';
export * from './activity.repository';
export * from './pipeline.repository'
export * from './deal-detail.repository'

export const BPMN_REPOSITORIES = [
  StageRepository.inject,
  DealRepository.inject,
  ActivityRepository.inject,
  PipelineRepository.inject,
  DealDetailRepository.inject
];