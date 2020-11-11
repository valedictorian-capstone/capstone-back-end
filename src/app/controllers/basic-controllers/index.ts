import { 
  DepartmentController,  
  GroupController, 
  CommentController,
  EventController,
  TriggerController,
  NotificationController
} from '.'

export * from './group.controller';
export * from './department.controller';
export * from './comment.controller';
export * from './trigger.controller';
export * from './event.controller';
export * from './notification.controller';


export const BASIC_CONTROLLERS = [
  DepartmentController,
  GroupController,
  CommentController,
  EventController,
  TriggerController,
  NotificationController
];