import { ProductController, TicketController, CategoryController } from '.'
export * from './product.controller';
export * from './ticket.controller';
export * from './category.controller';
export const SERVICE_CONTROLLERS = [
  ProductController,
  TicketController,
  CategoryController
];