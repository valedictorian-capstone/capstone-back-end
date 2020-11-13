import { Device } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { DEVICE_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class DeviceRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(DEVICE_REPOSITORY, DeviceRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Device);
  }
}
