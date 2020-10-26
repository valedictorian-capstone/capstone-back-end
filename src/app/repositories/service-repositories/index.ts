import { ServiceRepository, FeedBackRepository, OrderRepository } from '.';

export * from './service.repository';
export * from './feedback.repository';
export * from './order.repository';

export const SERVICE_REPOSITORIES = [
  ServiceRepository.inject,
  FeedBackRepository.inject,
  OrderRepository.inject
];