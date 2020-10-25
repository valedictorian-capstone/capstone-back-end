import { 
  DepartmentRepository, 
  GroupRepository, 
  PatternRepository, 
  NotificationRepository,
  CommentRepository
} from '.';

export * from './department.repository';
export * from './group.repository';
export * from './pattern.repository';
export * from './notification.repository';
export * from './comment.repository'

export const BASIC_REPOSITORIES = [
  DepartmentRepository.inject,
  GroupRepository.inject,
  PatternRepository.inject,
  NotificationRepository.inject,
  CommentRepository.inject
];
