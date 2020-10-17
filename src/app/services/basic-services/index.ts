import { DepartmentService, ExtraInformationService, GroupService, PatternService } from '.';
export * from './group.service';
export * from './department.service';
export * from './extra-information.service';
export * from './parttern.service';
export const BASIC_SERVICES = [DepartmentService, ExtraInformationService, GroupService, PatternService];