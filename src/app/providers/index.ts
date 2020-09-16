import {
  AccountProviders,
  AccountRoleProviders,
  RoleProviders,
} from './basic.provider';

export * from './basic.provider'

export const BASIC_PROVIDERS = [
  AccountProviders,
  AccountRoleProviders,
  RoleProviders,
];

import {
  WorkFlowConnectionProviders,
  WorkFlowInstanceProviders,
  WorkFlowProviders,
} from './bpmn.provider';

export * from './bpmn.provider'

export const BPMN_PROVIDERS = [
  WorkFlowConnectionProviders,
  WorkFlowInstanceProviders,
  WorkFlowProviders,
];
