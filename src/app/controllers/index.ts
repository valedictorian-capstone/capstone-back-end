import { AccountRoleController } from './basic-controllers/account-role.controller';
import { AccountController } from './basic-controllers/account.controller';
import { RoleController } from './basic-controllers/role.controller';

export const BASIC_CONTROLLERS = [AccountRoleController, AccountController, RoleController];
export * from './basic-controllers/account-role.controller';
export * from './basic-controllers/account.controller';
export * from './basic-controllers/role.controller';

import { WorkFlowController } from './bpmn-controllers/work-flow.controller';
import { WorkFlowConnectionController } from './bpmn-controllers/work-flow-connection.controller';
import { WorkFlowInstanceController } from './bpmn-controllers/work-flow-instance.controller';

export const BPMN_CONTROLLERS = [WorkFlowController, WorkFlowConnectionController, WorkFlowInstanceController];
export * from './bpmn-controllers/work-flow.controller';
export * from './bpmn-controllers/work-flow-connection.controller';
export * from './bpmn-controllers/work-flow-instance.controller';

import { AuthController } from './extra-controllers/auth.controller';

export const EXTRA_CONTROLLERS = [AuthController];
export * from './extra-controllers/auth.controller';