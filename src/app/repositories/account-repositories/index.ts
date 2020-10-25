import {
  AccountRepository,
  AccountDepartmentRepository
} from '.';

export * from './account.repository';
export * from './account-department.repository';
export const ACCOUNT_REPOSITORIES = [
  AccountRepository.inject,
  AccountDepartmentRepository.inject
];