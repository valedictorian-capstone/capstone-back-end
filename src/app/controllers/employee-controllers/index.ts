import { EmployeeController, RoleController } from '.';
export * from './employee.controller';
export * from './role.controller'
export const EMPLOYEE_CONTROLLERS = [
  EmployeeController,
  RoleController
];