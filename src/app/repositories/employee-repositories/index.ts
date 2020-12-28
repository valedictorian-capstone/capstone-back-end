import {
  EmployeeRepository,
  RoleRepository
} from '.';

export * from './employee.repository';
export * from './role.repository'
export const EMPLOYEE_REPOSITORIES = [
  EmployeeRepository.inject,
  RoleRepository.inject
];