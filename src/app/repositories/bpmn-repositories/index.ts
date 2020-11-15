import { DealRepository, StageRepository, ActivityRepository, PipelineRepository } from '.';

export * from './stage.repository';
export * from './deal.repository';
export * from './activity.repository';
export * from './pipeline.repository'

export const BPMN_REPOSITORIES = [
  StageRepository.inject,
  DealRepository.inject,
  ActivityRepository.inject,
  PipelineRepository.inject
];