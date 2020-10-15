import { DepartmentService, ExtraInformationService, GroupService, RoleService } from '.';
export * from './role.service';
export * from './group.service';
export * from './department.service';
export * from './extra-information.service';
export const BASIC_SERVICES = [DepartmentService, ExtraInformationService, GroupService, RoleService];