import { ProductService, TicketService, CategoryService } from '.';
export * from './category.service';
export * from './product.service';
export * from './ticket.service'
export const SERVICE_SERVICES = [ProductService, TicketService, CategoryService];