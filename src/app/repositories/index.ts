import { AccountRepository } from './basic-repositories/account.repository';
import { RoleRepository } from './basic-repositories/role.repository';

export * from './basic-repositories/account.repository';
export * from './basic-repositories/role.repository';

export const BASIC_REPOSITORY = [
  AccountRepository,
  RoleRepository,
];

// import { WorkFlowRepository } from './bpmn-repositories/work-flow.repository';
// import { WorkFlowConnectionRepository } from './bpmn-repositories/work-flow-connection.repository';
// import { WorkFlowInstanceRepository } from './bpmn-repositories/work-flow-instance.repository';

export const BPMN_REPOSITORY = [
  // WorkFlowConnectionRepository.inject,
  // WorkFlowRepository.inject,
  // WorkFlowInstanceRepository.inject,
];

// export * from './bpmn-repositories/work-flow.repository';
// export * from './bpmn-repositories/work-flow-connection.repository';
// export * from './bpmn-repositories/work-flow-instance.repository';
