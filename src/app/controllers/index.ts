//basic_controllers
import { AccountController } from './basic-controllers/account.controller';
import { RoleController } from './basic-controllers/role.controller';
import { DepartmentController } from './basic-controllers/department.controller';
import { AccountExtraValueController } from './basic-controllers/account-extra-value.controller';
import { AccountExtraInformationController } from './basic-controllers/account-extra-information.controller';
export * from './basic-controllers/account.controller';
export * from './basic-controllers/role.controller';
export * from './basic-controllers/department.controller';
export * from './basic-controllers/account-extra-value.controller';
export * from './basic-controllers/account-extra-information.controller';
export const BASIC_CONTROLLERS = [
  AccountController, 
  RoleController, 
  DepartmentController, 
  AccountExtraValueController,
  AccountExtraInformationController];



//basic_controllers
import { WFConnectionController } from './bpmn-controllers/wf-connection.controller';
import { WFInstanceController } from './bpmn-controllers/wf-instance.controller';
import { WFStepInstanceController } from './bpmn-controllers/wf-step-instance.controller';
import { WFStepController } from './bpmn-controllers/wf-step.controller';
import { WFController } from './bpmn-controllers/wf.controller';
import { WFDiagramController } from './bpmn-controllers/wf-diagram.controller';
export * from './bpmn-controllers/wf-connection.controller';
export * from './bpmn-controllers/wf.controller';
export * from './bpmn-controllers/wf-diagram.controller'
export const BPMN_CONTROLLERS = [
  WFController,
  WFConnectionController,
  WFStepController,
  WFInstanceController,
  WFStepInstanceController,
  WFDiagramController,
];

//extra controllers
import { AuthController } from './extra-controllers/auth.controller';
export * from './extra-controllers/auth.controller';
export const EXTRA_CONTROLLERS = [AuthController];

//form controllers
import { FormControlController } from './form-controllers/form-control.controller';
import { FormDataController } from './form-controllers/form-data.controller';
import { FormGroupController } from './form-controllers/form-group.controller';
import { FormValueController } from './form-controllers/form-value.controller';
export * from './form-controllers/form-control.controller';
export * from './form-controllers/form-data.controller';
export * from './form-controllers/form-group.controller';
export * from './form-controllers/form-value.controller';
export const FORM_CONTROLLERS = [FormControlController, FormDataController, FormGroupController, FormValueController];

//Customer controllers
import { CustomerController } from './customer-controller/customer.controller';
import { GroupController } from './customer-controller/group.controller';
import { CustomerExtraInformationController } from './customer-controller/customer-extra-information.controller';
import { CustomerExtraInformationDataController } from './customer-controller/customer-extra-information-data.controller';
import { ProductController } from './customer-controller/product.controller';
import { ProductExtraValueController } from './customer-controller/product-extra-value.controller';
import { ProductExtraInformationController } from './customer-controller/product-extra-information.controller';
export * from './customer-controller/customer.controller';
export * from './customer-controller/group.controller';
export * from './customer-controller/customer-extra-information.controller';
export * from './customer-controller/customer-extra-information-data.controller';
export const CUSTOMER_CONTROLLERS = [CustomerController, 
  GroupController, 
  CustomerExtraInformationController, 
  CustomerExtraInformationDataController, 
  ProductController,
  ProductExtraValueController,
  ProductExtraInformationController
];
