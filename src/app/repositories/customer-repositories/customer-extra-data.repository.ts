import { CustomerExtraData } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { CUSTOMER_EXTRA_DATA_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class CustomerExtraDataRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(CUSTOMER_EXTRA_DATA_REPOSITORY, CustomerExtraDataRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(CustomerExtraData);
  }
}
