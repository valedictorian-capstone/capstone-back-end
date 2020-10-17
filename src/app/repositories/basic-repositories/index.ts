import { DepartmentRepository, ExtraInformationRepository, GroupRepository, PatternRepository } from '.';
import { NotificationRepository } from './notification.repository';
export * from './department.repository';
export * from './group.repository';
export * from './extra-information.repository';
export * from './pattern.repository';
export * from './notification.repository';
export const BASIC_REPOSITORIES = [
  DepartmentRepository.inject,
  ExtraInformationRepository.inject,
  GroupRepository.inject,
  PatternRepository.inject,
  NotificationRepository.inject
];
