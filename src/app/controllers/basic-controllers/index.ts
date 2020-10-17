import { RoleController, DepartmentController, ExtraInformationController, GroupController, PatternController } from '.'
export * from './group.controller';
export * from './extra-information.controller';
export * from './role.controller';
export * from './department.controller';
export * from './pattern.controller';
export const BASIC_CONTROLLERS = [
  RoleController,
  DepartmentController,
  GroupController,
  ExtraInformationController,
  PatternController
];