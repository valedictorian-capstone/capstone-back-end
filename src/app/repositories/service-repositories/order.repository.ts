import { Order } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { ORDER_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class OrderRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(ORDER_REPOSITORY, OrderRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Order);
  }
}
