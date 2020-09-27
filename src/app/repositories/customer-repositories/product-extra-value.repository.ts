import { ProductExtraValue } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { PRODUCT_EXTRA_VALUE_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class ProductExtraValueRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PRODUCT_EXTRA_VALUE_REPOSITORY, ProductExtraValueRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(ProductExtraValue);
  }
}
