import { CustomerController, CustomerExtraInformationDataController } from '.';
export * from './customer.controller';
export * from './customer-extra-information-data.controller';
export const CUSTOMER_CONTROLLERS = [
  CustomerController,
  CustomerExtraInformationDataController,
];