import { AccountController, RoleController } from '.';
export * from './account.controller';
export * from './role.controller'
export const ACCOUNT_CONTROLLERS = [
  AccountController,
  RoleController
];