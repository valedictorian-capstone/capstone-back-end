import { Service } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { SERVICE_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class ServiceRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(SERVICE_REPOSITORY, ServiceRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Service);
  }
}
