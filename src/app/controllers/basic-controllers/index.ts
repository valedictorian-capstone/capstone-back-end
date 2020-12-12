import {
  GroupController,
  EventController,
  NotificationController,
  DeviceController,
  CommentController,
} from '.'

export * from './group.controller';
export * from './event.controller';
export * from './device.controller';
export * from './notification.controller';
export * from './comment.controller';


export const BASIC_CONTROLLERS = [
  GroupController,
  EventController,
  NotificationController,
  DeviceController,
  CommentController,
];