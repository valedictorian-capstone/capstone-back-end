import { 
    DepartmentService, 
    GroupService, 
    NotificationService,
    CommentService,
    EventService,
    TriggerService
} from '.';
export * from './group.service';
export * from './department.service';
export * from './notification.service';
export * from './comment.service';
export * from './event.service';
export * from './trigger.service'
export const BASIC_SERVICES = [
    DepartmentService, 
    GroupService, 
    NotificationService,
    CommentService,
    EventService,
    TriggerService
];
