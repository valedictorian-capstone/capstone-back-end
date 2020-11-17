import { ActivityService, DealService, StageService, ProcessService, DealDetailService } from '.';
export * from './deal.service';
export * from './stage.service';
export * from './activity.service';
export * from './process.service';
export * from './deal-detail.service';
export const BPMN_SERVICES = [
  ActivityService,
  DealService, 
  StageService,
  ProcessService,
  DealDetailService
];