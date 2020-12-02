import { 
  GroupRepository, 
  NotificationRepository,
  EventRepository,
  TriggerRepository,
  DeviceRepository,
  CommentRepository
} from '.';

export * from './group.repository';
export * from './group.repository';
export * from './notification.repository';
export * from './event.repository';
export * from './device.repository';
export * from './trigger.repository'
export * from './comment.repository'

export const BASIC_REPOSITORIES = [
  GroupRepository.inject,
  NotificationRepository.inject,
  EventRepository.inject,
  TriggerRepository.inject,
  DeviceRepository.inject,
  CommentRepository.inject
];
