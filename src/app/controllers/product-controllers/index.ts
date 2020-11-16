import { ProductController, TicketController } from '.'
export * from './product.controller';
export * from './ticket.controller';
export const SERVICE_CONTROLLERS = [
  ProductController,
  TicketController
];