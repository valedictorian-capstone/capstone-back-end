import { CustomerRepository, CustomerExtraInformationDataRepository } from '.';

export * from './customer-extra-information-data.repository';
export * from './customer.repository';
export const CUSTOMER_REPOSITORIES = [
  CustomerRepository.inject,
  CustomerExtraInformationDataRepository.inject,
];