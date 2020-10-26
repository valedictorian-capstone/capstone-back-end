import { AccountController, AccountDepartmentController } from '.';
export * from './account.controller';
export * from './account-department.controller';
export const ACCOUNT_CONTROLLERS = [
  AccountController,
  AccountDepartmentController
];