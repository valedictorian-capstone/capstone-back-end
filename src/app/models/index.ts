import { Account } from './basic-models/account.model';
import { Role } from './basic-models/role.model';

export * from './basic-models/account.model';
export * from './basic-models/role.model';

// export * from './bpmn-models/work-flow.model';
// export * from './bpmn-models/work-flow-instance.model';
// export * from './bpmn-models/work-flow-connection.model';

export const BASIC_MODLES = [Account, Role];