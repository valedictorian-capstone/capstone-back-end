import { ActivityController, DealController, StageController } from '.';
export * from './stage.controller';
export * from './deal.controller';
export * from './activity.controller'
export const BPMN_CONTROLLERS = [
  ActivityController,
  DealController, 
  StageController
];