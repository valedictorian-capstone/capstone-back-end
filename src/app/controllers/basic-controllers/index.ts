import { 
  DepartmentController,  
  GroupController, 
  CommentController,
  EventController,
  TriggerController
} from '.'

export * from './group.controller';
export * from './department.controller';
export * from './comment.controller';
export * from './trigger.controller';
export * from './event.controller';

export const BASIC_CONTROLLERS = [
  DepartmentController,
  GroupController,
  CommentController,
  EventController,
  TriggerController
];