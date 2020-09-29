import { Product } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { PRODUCT_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class ProductRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PRODUCT_REPOSITORY, ProductRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Product);
  }
}
