import { AccountController } from './basic-controllers/account.controller';
import { RoleController } from './basic-controllers/role.controller';
import { WFConnectionController } from './bpmn-controllers/wf-connection.controller';
import { WFInstanceController } from './bpmn-controllers/wf-instance.controller';
import { WFStepInstanceController } from './bpmn-controllers/wf-step-instance.controller';
import { WFStepController } from './bpmn-controllers/wf-step.controller';
import { WFController } from './bpmn-controllers/wf.controller';
import { AuthController } from './extra-controllers/auth.controller';
import { FormControlController } from './form-controllers/form-control.controller';
import { FormDataController } from './form-controllers/form-data.controller';
import { FormGroupController } from './form-controllers/form-group.controller';
import { FormValueController } from './form-controllers/form-value.controller';

export const BASIC_CONTROLLERS = [AccountController, RoleController];
export * from './basic-controllers/account.controller';
export * from './basic-controllers/role.controller';
export * from './bpmn-controllers/wf-connection.controller';
export * from './bpmn-controllers/wf.controller';
export * from './extra-controllers/auth.controller';
export * from './form-controllers/form-control.controller';
export * from './form-controllers/form-data.controller';
export * from './form-controllers/form-group.controller';
export * from './form-controllers/form-value.controller';

export const BPMN_CONTROLLERS = [
  WFController,
   WFConnectionController,
   WFStepController, 
   WFInstanceController,
   WFStepInstanceController,
  ];


export const EXTRA_CONTROLLERS = [AuthController];


export const FORM_CONTROLLERS = [FormControlController, FormDataController, FormGroupController, FormValueController];
