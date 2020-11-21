
import { ActivityService, DealService, StageService, PipelineService, DealDetailService, NoteService, LogService, AttachmentService } from '.';
export * from './deal.service';
export * from './stage.service';
export * from './activity.service';
export * from './pipeline.service';
export * from './attachment.service';
export * from './deal-detail.service';
export * from './note.service';
export * from './log.service';
export const BPMN_SERVICES = [
  ActivityService,
  DealService, 
  StageService,
  PipelineService,
  DealDetailService, 
  NoteService,
  LogService,
  AttachmentService
];