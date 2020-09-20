import { AccountRepository } from './basic-repositories/account.repository';
import { RoleRepository } from './basic-repositories/role.repository';
export * from './basic-repositories/account.repository';
export * from './basic-repositories/role.repository';

export const BASIC_REPOSITORY = [
  AccountRepository.inject,
  RoleRepository.inject,
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


import { FormControlRepository } from './form-repositories/form-control.repository';
import { FormDataRepository } from './form-repositories/form-data.repository';
import { FormGroupRepository } from './form-repositories/form-group.repository';
import { FormValueRepository } from './form-repositories/form-value.repository';
export * from './form-repositories/form-control.repository';
export * from './form-repositories/form-data.repository';
export * from './form-repositories/form-group.repository';
export * from './form-repositories/form-value.repository';
export const FORM_REPOSITORY = [
  FormControlRepository.inject,
  FormDataRepository.inject,
  FormGroupRepository.inject,
  FormValueRepository.inject
]