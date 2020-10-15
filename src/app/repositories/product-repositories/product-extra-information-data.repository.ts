import { ProductExtraInformationData } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { PRODUCT_EXTRA_INFORMATION_DATA_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class ProductExtraInformationDataRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PRODUCT_EXTRA_INFORMATION_DATA_REPOSITORY, ProductExtraInformationDataRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(ProductExtraInformationData);
  }
}
