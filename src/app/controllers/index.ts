import { AccountController } from './basic-controllers/account.controller';
import { RoleController } from './basic-controllers/role.controller';

export const BASIC_CONTROLLERS = [AccountController, RoleController];
export * from './basic-controllers/account.controller';
export * from './basic-controllers/role.controller';


export const BPMN_CONTROLLERS = [];

import { AuthController } from './extra-controllers/auth.controller';

export const EXTRA_CONTROLLERS = [AuthController];
export * from './extra-controllers/auth.controller';