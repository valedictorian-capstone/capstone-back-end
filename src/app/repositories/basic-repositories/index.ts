import { DepartmentRepository, ExtraInformationRepository, GroupRepository, RoleRepository } from '.';
export * from './department.repository';
export * from './group.repository';
export * from './role.repository';
export * from './extra-information.repository';
export const BASIC_REPOSITORIES = [DepartmentRepository.inject, ExtraInformationRepository.inject, GroupRepository.inject, RoleRepository.inject];