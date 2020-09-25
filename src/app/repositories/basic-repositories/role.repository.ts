import { Role } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { ROLE_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';
export class RoleRepository {
  constructor(
    @Inject('DATABASE_CONNECTION') protected readonly connection: Connection,
  ) {}

  public static readonly inject = inject(ROLE_REPOSITORY, RoleRepository);

  public readonly useHTTP = () => {
    return this.connection.getRepository(Role);
  };
  
}
