import { Employee } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { EMPLOYEE_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class EmployeeRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(EMPLOYEE_REPOSITORY, EmployeeRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Employee);
  }
}
