import { FormControlService, FormDataService, FormGroupService } from '.';

export * from './form-control.service';
export * from './form-group.service';
export * from './form-data.service';

export const FORM_SERVICES = [
  FormControlService,
  FormDataService,
  FormGroupService,
];