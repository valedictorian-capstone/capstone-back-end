import { ActivityController, DealController, StageController, ProcessController } from '.';
export * from './stage.controller';
export * from './deal.controller';
export * from './activity.controller';
export * from './process.controller';
export const BPMN_CONTROLLERS = [
  ActivityController,
  DealController, 
  StageController,
  ProcessController
];