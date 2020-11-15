import { ProductController, TicketController } from '.'
export * from './service.controller';
export * from './ticket.controller';
export const SERVICE_CONTROLLERS = [
  ProductController,
  TicketController
];