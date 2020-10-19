import { Comment } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { COMMENT_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class CommentRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(COMMENT_REPOSITORY, CommentRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Comment);
  }
}
