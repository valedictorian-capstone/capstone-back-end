import { inject } from 'src/app/extras/functions';
import { Role } from 'src/app/models';
import { ROLE_REPOSITORY } from 'src/app/types';
import { Repository } from 'typeorm';

export class RoleRepository extends Repository<Role> {
  constructor() {
    super();
  }
  public static readonly inject = inject(ROLE_REPOSITORY, RoleRepository);
}
