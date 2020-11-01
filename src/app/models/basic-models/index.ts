import {
    Group,
    Department,
    Notification,
    Comment,
    Event,
    Trigger
} from '.';

export * from './department.model';
export * from './group.model';
export * from './notification.model';
export * from './comment.model';
export * from './event.model';
export * from './trigger.model';

export const BASIC_MODELS = [
    Department,
    Group,
    Notification,
    Comment,
    Event,
    Trigger
];