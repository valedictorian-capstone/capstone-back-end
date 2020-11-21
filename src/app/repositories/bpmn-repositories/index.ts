
import { DealRepository, StageRepository, ActivityRepository, PipelineRepository, DealDetailRepository, AttachmentRepository, NoteRepository, LogRepository } from '.';

export * from './stage.repository';
export * from './deal.repository';
export * from './activity.repository';
export * from './pipeline.repository';
export * from './deal-detail.repository';
export * from './note.repository';
export * from './log.repository';
export * from './attachment.repository';

export const BPMN_REPOSITORIES = [
  StageRepository.inject,
  DealRepository.inject,
  ActivityRepository.inject,
  PipelineRepository.inject,
  DealDetailRepository.inject, 
  NoteRepository.inject,
  AttachmentRepository.inject,
  LogRepository.inject
];