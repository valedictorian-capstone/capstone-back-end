import { FormControl } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { FORM_CONTROL_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class FormControlRepository {
    constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
    }
    public static readonly inject = inject(FORM_CONTROL_REPOSITORY, FormControlRepository);
    public readonly useHTTP = () => {
      return this.connection.getRepository(FormControl);
    }
  }