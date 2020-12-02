import { 
    GroupService, 
    NotificationService,
    EventService,
    TriggerService,
    DeviceService,
    CommentService
} from '.';
export * from './group.service';
export * from './notification.service';
export * from './event.service';
export * from './trigger.service';
export * from './device.service';
export * from './comment.service';
export const BASIC_SERVICES = [
    GroupService, 
    NotificationService,
    EventService,
    TriggerService,
    DeviceService,
    CommentService
];
