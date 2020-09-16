import { Account } from './basic-models/account.model';
import { Role } from './basic-models/role.model';
import { AccountRole } from './basic-models/account-role.model';

import { WorkFlow } from './bpmn-models/work-flow.model';
import { WorkFlowInstance } from './bpmn-models/work-flow-instance.model';
import { WorkFlowConnection } from './bpmn-models/work-flow-connection.model';

export * from './basic-models/account.model';
export * from './basic-models/role.model';
export * from './basic-models/account-role.model';

export * from './bpmn-models/work-flow.model';
export * from './bpmn-models/work-flow-instance.model';
export * from './bpmn-models/work-flow-connection.model';

export const BASIC_MODELS = [Account, Role, AccountRole];
export const BPMN_MODELS = [WorkFlow, WorkFlowInstance, WorkFlowConnection];