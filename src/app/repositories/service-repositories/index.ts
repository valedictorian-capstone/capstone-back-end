import { ServiceRepository, OrderRequestRepository} from '.';

export * from './service.repository';
export * from './order-request.repository';

export const SERVICE_REPOSITORIES = [
  ServiceRepository.inject,
  OrderRequestRepository.inject
];