import {
  GroupController,
  EventController,
  TriggerController,
  NotificationController,
  DeviceController,
} from '.'

export * from './group.controller';
export * from './trigger.controller';
export * from './event.controller';
export * from './device.controller';
export * from './notification.controller';


export const BASIC_CONTROLLERS = [
  GroupController,
  EventController,
  TriggerController,
  NotificationController,
  DeviceController,
];