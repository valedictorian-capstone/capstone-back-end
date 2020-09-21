import { Customer } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { CUSTOMER_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class CustomerRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(CUSTOMER_REPOSITORY, CustomerRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Customer);
  }
}
