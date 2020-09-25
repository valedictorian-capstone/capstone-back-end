import { Department } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { DEPARTMENT_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class DepartmentRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(DEPARTMENT_REPOSITORY, DepartmentRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Department);
  }
}
