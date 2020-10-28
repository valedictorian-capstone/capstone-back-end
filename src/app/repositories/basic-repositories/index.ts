import { 
  DepartmentRepository, 
  GroupRepository, 
  NotificationRepository,
  CommentRepository
} from '.';

export * from './department.repository';
export * from './group.repository';
export * from './notification.repository';
export * from './comment.repository'

export const BASIC_REPOSITORIES = [
  DepartmentRepository.inject,
  GroupRepository.inject,
  NotificationRepository.inject,
  CommentRepository.inject
];
