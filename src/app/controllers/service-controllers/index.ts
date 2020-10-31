import { ServiceController, OrderRequestController } from '.'
export * from './service.controller';
export * from './order-request.controller';
export const SERVICE_CONTROLLERS = [
  ServiceController,
  OrderRequestController
];