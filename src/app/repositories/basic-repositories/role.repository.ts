import { inject } from 'src/app/extras/functions';
import { CRMRepository } from 'src/app/extras/repositories';
import { Role } from 'src/app/models';
import { ROLE_REPOSITORY } from 'src/app/types';

export class RoleRepository extends CRMRepository<Role> {
  constructor() {
    super(Role);
  }
  public static readonly inject = inject(ROLE_REPOSITORY, RoleRepository);
}
