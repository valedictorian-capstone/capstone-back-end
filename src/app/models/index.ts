import { Account } from './basic-models/account.model';
import { Role } from './basic-models/role.model';

// import { Customer } from './basic-models/customer.model';
// import { Group } from './basic-models/group.model';
// import { CustomerGroup } from './basic-models/customer-group';

export * from './basic-models/account.model';
export * from './basic-models/role.model';


// export * from './basic-models/customer.model';
// export * from './basic-models/group.model';
// export * from './basic-models/customer-group';


export const BASIC_MODELS = [Account, Role];
// export const BPMN_MODELS = [WorkFlow, WorkFlowInstance, WorkFlowConnection];