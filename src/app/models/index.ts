import { Account } from './basic-models/account.model';
import { Role } from './basic-models/role.model';
import { Customer } from './customer-models/customer.model';
import { Group } from './customer-models/group.model';
import { WF } from './bpmn-models/wf.model';
import { WFCondition } from './bpmn-models/wf-condition.model';
import { WFConnection } from './bpmn-models/wf-connection.model';
import { WFInstance } from './bpmn-models/wf-instance.model';
import { WFStep } from './bpmn-models/wf-step.model';
import { WFStepInstance } from './bpmn-models/wf-step-instance.model';
import { FormControl } from './form-models/form-control.model'
import { FormData } from './form-models/form-data.model'
import { FormGroup } from './form-models/form-group.model'
import { FormValue } from './form-models/form-value.model'
import { CustomerExtraInformation } from './customer-models/customer-extra-information.model'
import { CustomerExtraInformationData } from './customer-models/customer-extra-information-data.model'
import { CustomerExtraData } from './customer-models/customer-extra-data.model';


export * from './basic-models/account.model';
export * from './basic-models/role.model';

export * from './form-models/form-group.model';
export * from './form-models/form-value.model';
export * from './form-models/form-data.model';
export * from './form-models/form-control.model';


// export * from './basic-models/customer.model';
// export * from './basic-models/group.model';
// export * from './basic-models/customer-group';


export const BASIC_MODELS = [Account, Role];
export const BPMN_MODELS = [WF, WFCondition, WFConnection, WFInstance, WFStep, WFStepInstance];
export const FORM_MODELS = [FormControl, FormData, FormGroup, FormValue];
export const CUSTOMER_MODELS = [Customer, Group, CustomerExtraInformation, CustomerExtraInformationData, CustomerExtraData];
