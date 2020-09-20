//basic service
import { AccountService } from './basic-services/account.service';
import { RoleService } from './basic-services/role.service';
import { WFConnectionService } from './bpmn-services/wf-connection.service';
import { WFInstanceService } from './bpmn-services/wf-instance.service';
import { WFStepInstanceService } from './bpmn-services/wf-step-instance.service';
import { WFStepService } from './bpmn-services/wf-step.service';
//bpmn service
import { WFService } from './bpmn-services/wf.service';
import { FirebaseService } from './extra-services/firebase.service';
//form service
import { FormControlService } from './form-services/form-control.service';
import { FormDataService } from './form-services/form-data.service';
import { FormGroupService } from './form-services/form-group.service';
import { FormValueService } from './form-services/form-value.service';

export * from './basic-services/account.service';
export * from './basic-services/role.service';
export * from './bpmn-services/wf-connection.service';
export * from './bpmn-services/wf-instance.service';
export * from './bpmn-services/wf-step-instance.service';
export * from './bpmn-services/wf-step.service';
export * from './bpmn-services/wf.service';
export * from './extra-services/firebase.service';
export * from './form-services/form-control.service';
export * from './form-services/form-data.service';
export * from './form-services/form-group.service';
export * from './form-services/form-value.service';

export const BASIC_SERVICES = [AccountService, RoleService];




export const BPMN_SERVICES = [
  WFService, 
  WFConnectionService,
  WFStepService,
  WFInstanceService,
  WFStepInstanceService
];



export const FORM_SERVICE = [FormControlService, FormDataService, FormGroupService, FormValueService];


export const EXTRA_SERVICES = [FirebaseService];
