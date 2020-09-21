import { Group } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { GROUP_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class GroupRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(GROUP_REPOSITORY, GroupRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Group);
  }
}
