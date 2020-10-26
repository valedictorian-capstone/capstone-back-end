import { AccountService, AccountDepartmentService } from '.';
import { RoleService } from './role.service';
export * from './account.service';
export * from './account-department.service'
export * from './role.service'
export const ACCOUNT_SERVICES = [AccountService, AccountDepartmentService, RoleService];