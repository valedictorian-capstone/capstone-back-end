import { ProductExtraInformation } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { PRODUCT_EXTRA_INFORMATION_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class ProductExtraInformationRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PRODUCT_EXTRA_INFORMATION_REPOSITORY, ProductExtraInformationRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(ProductExtraInformation);
  }
}
