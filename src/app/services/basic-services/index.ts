import { 
    DepartmentService, 
    GroupService, 
    NotificationService,
    CommentService
} from '.';
export * from './group.service';
export * from './department.service';
export * from './notification.service';
export * from './comment.service'
export const BASIC_SERVICES = [
    DepartmentService, 
    GroupService, 
    NotificationService,
    CommentService
];
