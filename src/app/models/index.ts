 //basic model export
import { Account } from './basic-models/account.model';
import { Role } from './basic-models/role.model';
import { Department } from './basic-models/department.model';
import { AccountExtraValue } from './basic-models/account-extra-value.model';
import { AccountExtraInformation } from './basic-models/account-extra-information.model';
export const BASIC_MODELS = [Account, Role, Department, AccountExtraValue, AccountExtraInformation];
export * from './basic-models/account.model';
export * from './basic-models/role.model';
export * from './basic-models/department.model';
export * from './basic-models/account-extra-value.model';
export * from './basic-models/account-extra-information.model';

//bpmn model export
import { WF } from './bpmn-models/wf.model';
import { WFCondition } from './bpmn-models/wf-condition.model';
import { WFConnection } from './bpmn-models/wf-connection.model';
import { WFInstance } from './bpmn-models/wf-instance.model';
import { WFStep } from './bpmn-models/wf-step.model';
import { WFStepInstance } from './bpmn-models/wf-step-instance.model';
export const BPMN_MODELS = [WF, WFCondition, WFConnection, WFInstance, WFStep, WFStepInstance];
export * from './bpmn-models/wf.model';
export * from './bpmn-models/wf-condition.model';
export * from './bpmn-models/wf-connection.model';
export * from './bpmn-models/wf-instance.model';
export * from './bpmn-models/wf-step-instance.model';
export * from './bpmn-models/wf-step.model';

//form model
import { FormControl } from './form-models/form-control.model';
import { FormData } from './form-models/form-data.model';
import { FormGroup } from './form-models/form-group.model';
import { FormValue } from './form-models/form-value.model';
export const FORM_MODELS = [FormControl, FormData, FormGroup, FormValue];
export * from './form-models/form-group.model';
export * from './form-models/form-value.model';
export * from './form-models/form-data.model';
export * from './form-models/form-control.model';

// customer models
import { Customer } from './customer-models/customer.model';
import { Group } from './customer-models/group.model';
import { CustomerExtraInformation } from './customer-models/customer-extra-information.model'
import { CustomerExtraInformationData } from './customer-models/customer-extra-information-data.model'
import { Product } from './customer-models/product.model';
import { ProductExtraValue } from './customer-models/product-extra-value.model';
import { ProductExtraInformation } from './customer-models/product-extra-information.model';
export const CUSTOMER_MODELS = [Customer, Group, CustomerExtraInformation, CustomerExtraInformationData, Product, ProductExtraValue, ProductExtraInformation];
export * from './customer-models/customer.model';
export * from './customer-models/group.model';
export * from './customer-models/customer-extra-information.model'
export * from './customer-models/customer-extra-information-data.model'
export * from './customer-models/product-extra-value.model'
export * from './customer-models/product-extra-information.model'
export * from './customer-models/product.model'


// export * from './basic-models/customer.model';
// export * from './basic-models/group.model';
// export * from './basic-models/customer-group';





