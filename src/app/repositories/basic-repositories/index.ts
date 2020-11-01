import { 
  DepartmentRepository, 
  GroupRepository, 
  NotificationRepository,
  CommentRepository,
  EventRepository,
  TriggerRepository
} from '.';

export * from './department.repository';
export * from './group.repository';
export * from './notification.repository';
export * from './comment.repository'
export * from './event.repository';
export * from './trigger.repository'

export const BASIC_REPOSITORIES = [
  DepartmentRepository.inject,
  GroupRepository.inject,
  NotificationRepository.inject,
  CommentRepository.inject,
  EventRepository.inject,
  TriggerRepository.inject
];
