import { ActivityService, DealService, StageService, PipelineService } from '.';
export * from './deal.service';
export * from './stage.service';
export * from './activity.service';
export * from './pipeline.service';
export const BPMN_SERVICES = [
  ActivityService,
  DealService, 
  StageService,
  PipelineService
];