import { AccountController, AccountExtraInformationDataController } from '.';
export * from './account-extra-information-data.controller';
export * from './account.controller';
export const ACCOUNT_CONTROLLERS = [
  AccountController,
  AccountExtraInformationDataController,
];