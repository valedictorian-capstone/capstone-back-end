import { ProductController, ProductExtraInformationDataController } from '.'
export * from './product.controller';
export * from './product-extra-information-data.controller';
export const PRODUCT_CONTROLLERS = [
  ProductController,
  ProductExtraInformationDataController,
];