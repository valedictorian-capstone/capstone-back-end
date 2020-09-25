import { CustomerExtraInformation } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { CUSTOMER_EXTRA_INFORMATION_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class CustomerExtraInformationRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(CUSTOMER_EXTRA_INFORMATION_REPOSITORY, CustomerExtraInformationRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(CustomerExtraInformation);
  }
}
