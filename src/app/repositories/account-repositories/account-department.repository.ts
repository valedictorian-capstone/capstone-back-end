import { AccountDepartment } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { ACCOUNT_DEPARTMENT_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class AccountDepartmentRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(ACCOUNT_DEPARTMENT_REPOSITORY, AccountDepartmentRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(AccountDepartment);
  }
}
