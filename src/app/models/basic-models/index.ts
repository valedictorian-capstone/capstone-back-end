import { Role, Group, ExtraInformation, Department } from '.';

export * from './department.model';
export * from './group.model';
export * from './role.model';
export * from './extra-information.model';
export const BASIC_MODELS = [Role, Department, ExtraInformation, Group];