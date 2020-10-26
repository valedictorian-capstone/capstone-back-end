import { AccountController, AccountDepartmentController } from '.';
import { RoleController } from './role.controller';
export * from './account.controller';
export * from './account-department.controller';
export * from './role.controller'
export const ACCOUNT_CONTROLLERS = [
  AccountController,
  AccountDepartmentController,
  RoleController
];