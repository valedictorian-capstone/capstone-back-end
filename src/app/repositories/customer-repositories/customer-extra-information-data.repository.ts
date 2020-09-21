import { CustomerExtraInformationData } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class CustomerExtraInformationDataRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(CUSTOMER_EXTRA_INFORMATION_DATA_REPOSITORY, CustomerExtraInformationDataRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(CustomerExtraInformationData);
  }
}
