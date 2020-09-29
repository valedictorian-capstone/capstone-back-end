//basic
import { DepartmentRepository } from './basic-repositories/department.repository';
import { AccountRepository } from './basic-repositories/account.repository';
import { RoleRepository } from './basic-repositories/role.repository';
import { AccountExtraValueRepository } from './basic-repositories/account-extra-value.repository';
import { AccountExtraInformationRepository } from './basic-repositories/account-extra-information.repository';
export const BASIC_REPOSITORY = [
  AccountRepository.inject,
  RoleRepository.inject,
  DepartmentRepository.inject,
  AccountExtraValueRepository.inject,
  AccountExtraInformationRepository.inject
];
export * from './basic-repositories/account.repository';
export * from './basic-repositories/role.repository';
export * from './basic-repositories/department.repository';
export * from './basic-repositories/account-extra-value.repository';
export * from './basic-repositories/account-extra-information.repository';







//bpmn
import { WFConnectionRepository } from './bpmn-repositories/wf-connection.repository';
import { WFInstanceRepository } from './bpmn-repositories/wf-instance.repository';
import { WFStepInstanceRepository } from './bpmn-repositories/wf-step-instance.repository';
import { WFStepRepository } from './bpmn-repositories/wf-step.repository';
import { WFRepository } from './bpmn-repositories/wf.repository';
export const BPMN_REPOSITORY = [
  WFRepository.inject,
  WFConnectionRepository.inject,
  WFStepRepository.inject,
  WFInstanceRepository.inject,
  WFStepInstanceRepository.inject,
];
export * from './bpmn-repositories/wf-connection.repository';
export * from './bpmn-repositories/wf-instance.repository';
export * from './bpmn-repositories/wf-step.repository';
export * from './bpmn-repositories/wf.repository';
export * from './bpmn-repositories/wf-step-instance.repository'






//form
import { FormControlRepository } from './form-repositories/form-control.repository';
import { FormDataRepository } from './form-repositories/form-data.repository';
import { FormGroupRepository } from './form-repositories/form-group.repository';
import { FormValueRepository } from './form-repositories/form-value.repository';
export const FORM_REPOSITORY = [
  FormControlRepository.inject,
  FormDataRepository.inject,
  FormGroupRepository.inject,
  FormValueRepository.inject
];
export * from './form-repositories/form-control.repository';
export * from './form-repositories/form-data.repository';
export * from './form-repositories/form-group.repository';
export * from './form-repositories/form-value.repository';





//customer
import { GroupRepository } from './customer-repositories/group.repository';
import { CustomerRepository } from './customer-repositories/customer.repository';
import { CustomerExtraInformationDataRepository } from './customer-repositories/customer-extra-information-data.repository';
import { CustomerExtraInformationRepository } from './customer-repositories/customer-extra-information.repository';
import { ProductRepository } from './customer-repositories/product.repository';
import { ProductExtraValueRepository } from './customer-repositories/product-extra-value.repository';
import { ProductExtraInformationRepository } from './customer-repositories/product-extra-information.repository';
export const CUSTOMER_REPOSITORY = [
  GroupRepository.inject,
  CustomerRepository.inject,
  CustomerExtraInformationDataRepository.inject,
  CustomerExtraInformationRepository.inject,
  ProductRepository.inject,
  ProductExtraValueRepository.inject,
  ProductExtraInformationRepository.inject
];
export * from './customer-repositories/group.repository';
export * from './customer-repositories/customer.repository';
export * from './customer-repositories/customer-extra-information-data.repository';
export * from './customer-repositories/customer-extra-information.repository';
export * from './customer-repositories/product.repository';
export * from './customer-repositories/product-extra-information.repository';
export * from './customer-repositories/product-extra-value.repository';









