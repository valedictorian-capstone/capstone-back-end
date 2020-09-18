import { AccountService } from './basic-services/account.service';
import { RoleService } from './basic-services/role.service';

export const BASIC_SERVICES = [AccountService, RoleService];
export * from './basic-services/account.service';
export * from './basic-services/role.service';

// import { WorkFlowService } from './bpmn-services/work-flow.service';
// import { WorkFlowConnectionService } from './bpmn-services/work-flow-connection.service';
// import { WorkFlowInstanceService } from './bpmn-services/work-flow-instance.service';

export const BPMN_SERVICES = [];
// export * from './bpmn-services/work-flow.service';
// export * from './bpmn-services/work-flow-connection.service';
// export * from './bpmn-services/work-flow-instance.service';

import { FirebaseService } from './extra-services/firebase.service';

export const EXTRA_SERVICES = [FirebaseService];
export * from './extra-services/firebase.service';