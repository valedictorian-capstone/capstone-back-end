import {
    Group,
    Notification,
    Event,
    Trigger,
    Device
} from '.';

export * from './device.model';
export * from './group.model';
export * from './notification.model';
export * from './event.model';
export * from './trigger.model';

export const BASIC_MODELS = [
    Group,
    Notification,
    Event,
    Trigger,
    Device
];