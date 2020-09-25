import { FormValue } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { FORM_VALUE_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class FormValueRepository {
    constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
    }
    public static readonly inject = inject(FORM_VALUE_REPOSITORY, FormValueRepository);
    public readonly useHTTP = () => {
      return this.connection.getRepository(FormValue);
    }
  }