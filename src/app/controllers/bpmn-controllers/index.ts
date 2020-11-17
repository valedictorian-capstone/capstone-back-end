import { ActivityController, DealController, StageController, PipelineController } from '.';
export * from './stage.controller';
export * from './deal.controller';
export * from './activity.controller';
export * from './pipeline.controller';
export const BPMN_CONTROLLERS = [
  ActivityController,
  DealController, 
  StageController,
  PipelineController
];