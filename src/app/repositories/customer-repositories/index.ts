import { CustomerRepository } from '.';

export * from './customer.repository';
export const CUSTOMER_REPOSITORIES = [
  CustomerRepository.inject
];