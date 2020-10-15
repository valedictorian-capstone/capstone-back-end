import { AccountRepository, AccountExtraInformationDataRepository } from '.';

export * from './account-extra-information-data.repository';
export * from './account.repository';
export const ACCOUNT_REPOSITORIES = [
  AccountRepository.inject,
  AccountExtraInformationDataRepository.inject,
];