import { ProductRepository, ProductExtraInformationDataRepository } from '.';

export * from './product-extra-information-data.repository';
export * from './product.repository';
export const PRODUCT_REPOSITORIES = [
  ProductRepository.inject,
  ProductExtraInformationDataRepository.inject,
];