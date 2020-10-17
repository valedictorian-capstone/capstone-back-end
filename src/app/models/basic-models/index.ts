import {
    Role,
    Group,
    ExtraInformation,
    Department,
    Pattern,
    Notification
} from '.';

export * from './department.model';
export * from './group.model';
export * from './role.model';
export * from './extra-information.model';
export * from './pattern.model';
export * from './notification.model'
export const BASIC_MODELS = [
    Role,
    Department,
    ExtraInformation,
    Group,
    Pattern,
    Notification
];