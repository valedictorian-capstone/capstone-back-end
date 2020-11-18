import { ActivityService, DealService, StageService, PipelineService, DealDetailService } from '.';
export * from './deal.service';
export * from './stage.service';
export * from './activity.service';
export * from './pipeline.service';
export * from './deal-detail.service';
export const BPMN_SERVICES = [
  ActivityService,
  DealService, 
  StageService,
  PipelineService,
  DealDetailService
];