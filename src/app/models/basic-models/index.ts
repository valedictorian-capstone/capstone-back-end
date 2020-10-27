import {
    Group,
    Department,
    Notification,
    Comment
} from '.';

export * from './department.model';
export * from './group.model';
export * from './notification.model';
export * from './comment.model';
export const BASIC_MODELS = [
    Department,
    Group,
    Notification,
    Comment
];