import { ProductRepository , TicketRepository} from '.';

export * from './product.repository';
export * from './ticket.repository';

export const PRODUCT_REPOSITORIES = [
  ProductRepository.inject,
  TicketRepository.inject
];