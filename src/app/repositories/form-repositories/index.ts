import { FormControlRepository, FormDataRepository, FormGroupRepository, FormValueRepository } from '.';
export * from './form-control.repository';
export * from './form-data.repository';
export * from './form-group.repository';
export * from './form-value.repository';
export const FORM_REPOSITORIES = [
  FormControlRepository.inject,
  FormDataRepository.inject,
  FormGroupRepository.inject,
  FormValueRepository.inject
];