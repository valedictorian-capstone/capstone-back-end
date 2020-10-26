import {
  AccountRepository,
  AccountDepartmentRepository
} from '.';
import { RoleRepository } from './role.repository';

export * from './account.repository';
export * from './account-department.repository';
export * from './role.repository'
export const ACCOUNT_REPOSITORIES = [
  AccountRepository.inject,
  AccountDepartmentRepository.inject,
  RoleRepository.inject
];