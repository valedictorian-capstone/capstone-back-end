import { FormGroup } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { FORM_GROUP_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class FormGroupRepository {
    constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
    }
    public static readonly inject = inject(FORM_GROUP_REPOSITORY, FormGroupRepository);
    public readonly useHTTP = () => {
      return this.connection.getRepository(FormGroup);
    }
  }