import { ActivityController, DealController, StageController, PipelineController, AttachmentController, NoteController, LogController, DealDetailController } from '.';
export * from './stage.controller';
export * from './deal.controller';
export * from './deal-detail.controller';
export * from './attachment.controller';
export * from './activity.controller';
export * from './pipeline.controller';
export * from './note.controller';
export * from './log.controller';
export const BPMN_CONTROLLERS = [
  ActivityController,
  DealController, 
  StageController,
  PipelineController,
  AttachmentController,
  NoteController,
  LogController,
  DealDetailController
];