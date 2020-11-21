import { ProductRepository , TicketRepository, CategoryRepository} from '.';

export * from './product.repository';
export * from './ticket.repository';
export * from './category.repository';

export const PRODUCT_REPOSITORIES = [
  ProductRepository.inject,
  TicketRepository.inject,
  CategoryRepository.inject,
];