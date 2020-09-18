import { Role } from 'src/app/models';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  public readonly findOneCopy = (id:string):Promise<Role> => {
    return this.findOne(id)
  }
}
