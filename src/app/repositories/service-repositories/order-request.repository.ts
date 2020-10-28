import { OrderRequest } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { ORDER_REQUEST_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class OrderRequestRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(ORDER_REQUEST_REPOSITORY, OrderRequestRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(OrderRequest);
  }
}
