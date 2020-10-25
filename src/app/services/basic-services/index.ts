import { 
    DepartmentService, 
    GroupService, 
    PatternService, 
    NotificationService,
    CommentService
} from '.';
export * from './group.service';
export * from './department.service';
export * from './parttern.service';
export * from './notification.service';
export * from './comment.service'
export const BASIC_SERVICES = [
    DepartmentService, 
    GroupService, 
    PatternService, 
    NotificationService,
    CommentService
];
