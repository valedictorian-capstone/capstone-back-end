import { FormData } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { FORM_DATA_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class FormDataRepository {
    constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
    }
    public static readonly inject = inject(FORM_DATA_REPOSITORY, FormDataRepository);
    public readonly useHTTP = () => {
      return this.connection.getRepository(FormData);
    }
  }