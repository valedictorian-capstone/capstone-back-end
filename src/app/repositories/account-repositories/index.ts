import {
  AccountRepository,
  RoleRepository
} from '.';

export * from './account.repository';
export * from './role.repository'
export const ACCOUNT_REPOSITORIES = [
  AccountRepository.inject,
  RoleRepository.inject
];