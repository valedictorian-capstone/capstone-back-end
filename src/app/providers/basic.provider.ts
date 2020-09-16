import {
  ACCOUNT_REPOSITORY,
  ACCOUNT_ROLE_REPOSITORY,
  ROLE_REPOSITORY,
} from 'src/app/constant';
import {
  AccountRepository,
  AccountRoleRepository,
  RoleRepository,
} from '../repositories';

export const AccountRoleProviders = {
  provide: ACCOUNT_ROLE_REPOSITORY,
  useClass: AccountRoleRepository,
};

export const AccountProviders = {
  provide: ACCOUNT_REPOSITORY,
  useClass: AccountRepository,
};

export const RoleProviders = {
  provide: ROLE_REPOSITORY,
  useClass: RoleRepository,
};
