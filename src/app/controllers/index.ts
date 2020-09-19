import { AccountController } from './basic-controllers/account.controller';
import { RoleController } from './basic-controllers/role.controller';

export const BASIC_CONTROLLERS = [AccountController, RoleController];
export * from './basic-controllers/account.controller';
export * from './basic-controllers/role.controller';


export const BPMN_CONTROLLERS = [];

import { AuthController } from './extra-controllers/auth.controller';

export const EXTRA_CONTROLLERS = [AuthController];
export * from './extra-controllers/auth.controller';


import { FormControlController } from './form-controllers/form-control.controller';
import { FormDataController } from './form-controllers/form-data.controller';
import { FormGroupController } from './form-controllers/form-group.controller';
import { FormValueController } from './form-controllers/form-value.controller';
export const FORM_CONTROLLERS = [FormControlController, FormDataController, FormGroupController, FormValueController];
export * from './form-controllers/form-control.controller';
export * from './form-controllers/form-data.controller';
export * from './form-controllers/form-group.controller';
export * from './form-controllers/form-value.controller';