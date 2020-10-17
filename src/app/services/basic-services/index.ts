import { DepartmentService, ExtraInformationService, GroupService, RoleService, PatternService } from '.';
import { NotificationService } from './notification.service';
export * from './role.service';
export * from './group.service';
export * from './department.service';
export * from './extra-information.service';
export * from './parttern.service';
export * from './notification.service'
export const BASIC_SERVICES = [DepartmentService, ExtraInformationService, GroupService, RoleService, PatternService, NotificationService];