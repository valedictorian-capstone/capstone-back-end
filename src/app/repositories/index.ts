import { AccountRepository } from './basic-repositories/account.repository';
import { RoleRepository } from './basic-repositories/role.repository';
import { WFConnectionRepository } from './bpmn-repositories/wf-connection.repository';
import { WFInstanceRepository } from './bpmn-repositories/wf-instance.repository';
import { WFStepInstanceRepository } from './bpmn-repositories/wf-step-instance.repository';
import { WFStepRepository } from './bpmn-repositories/wf-step.repository';
import { WFRepository } from './bpmn-repositories/wf.repository';
import { FormControlRepository } from './form-repositories/form-control.repository';
import { FormDataRepository } from './form-repositories/form-data.repository';
import { FormGroupRepository } from './form-repositories/form-group.repository';
import { FormValueRepository } from './form-repositories/form-value.repository';

//basic
export * from './basic-repositories/account.repository';
export * from './basic-repositories/role.repository';
//bpmn
export * from './bpmn-repositories/wf-connection.repository';
export * from './bpmn-repositories/wf-instance.repository';
export * from './bpmn-repositories/wf-step.repository';
export * from './bpmn-repositories/wf.repository';
export * from './bpmn-repositories/wf-step-instance.repository'
//form
export * from './form-repositories/form-control.repository';
export * from './form-repositories/form-data.repository';
export * from './form-repositories/form-group.repository';
export * from './form-repositories/form-value.repository';



export const BASIC_REPOSITORY = [
  AccountRepository.inject,
  RoleRepository.inject,
];

export const BPMN_REPOSITORY = [
  WFRepository.inject,
  WFConnectionRepository.inject,
  WFStepRepository.inject,
  WFInstanceRepository.inject,
  WFStepInstanceRepository.inject,
];

export const FORM_REPOSITORY = [
  FormControlRepository.inject,
  FormDataRepository.inject,
  FormGroupRepository.inject,
  FormValueRepository.inject
]