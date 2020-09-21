//basic service
import { AccountService } from './basic-services/account.service';
import { RoleService } from './basic-services/role.service';
export * from './basic-services/account.service';
export * from './basic-services/role.service';
export const BASIC_SERVICES = [AccountService, 
  RoleService
];



//bpmn service
import { WFService } from './bpmn-services/wf.service';
import { FirebaseService } from './extra-services/firebase.service';
import { WFConnectionService } from './bpmn-services/wf-connection.service';
import { WFInstanceService } from './bpmn-services/wf-instance.service';
import { WFStepInstanceService } from './bpmn-services/wf-step-instance.service';
import { WFStepService } from './bpmn-services/wf-step.service';
export * from './bpmn-services/wf-connection.service';
export * from './bpmn-services/wf-instance.service';
export * from './bpmn-services/wf-step-instance.service';
export * from './bpmn-services/wf-step.service';
export * from './bpmn-services/wf.service';
export const BPMN_SERVICES = [
  WFService, 
  WFConnectionService,
  WFStepService,
  WFInstanceService,
  WFStepInstanceService
];

//form service
import { FormControlService } from './form-services/form-control.service';
import { FormDataService } from './form-services/form-data.service';
import { FormGroupService } from './form-services/form-group.service';
import { FormValueService } from './form-services/form-value.service';
export * from './form-services/form-control.service';
export * from './form-services/form-data.service';
export * from './form-services/form-group.service';
export * from './form-services/form-value.service';
export const FORM_SERVICE = [FormControlService, 
  FormDataService, 
  FormGroupService, 
  FormValueService
];



//extra services
export * from './extra-services/firebase.service';
export const EXTRA_SERVICES = [FirebaseService];


//customer services
import { CustomerService } from './customer-services/customer.service';
import { GroupService } from './customer-services/group.service';
import { CustomerExtraInformationService } from './customer-services/customer-extra-information.service';
import { CustomerExtraInformationDataService } from './customer-services/customer-extra-information-data.service';
import { CustomerExtraDataService } from './customer-services/customer-extra-data.service';
export * from './customer-services/customer.service';
export * from './customer-services/group.service';
export * from './customer-services/customer-extra-information.service';
export * from './customer-services/customer-extra-information-data.service';
export * from './customer-services/customer-extra-data.service';
export const CUSTOMER_SERVICES = [CustomerService, 
  GroupService, 
  CustomerExtraInformationService, 
  CustomerExtraInformationDataService, 
  CustomerExtraDataService];
