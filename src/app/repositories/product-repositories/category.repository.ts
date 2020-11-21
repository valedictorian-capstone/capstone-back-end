import { Category } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { CATEGORY_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class CategoryRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(CATEGORY_REPOSITORY, CategoryRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Category);
  }
}
