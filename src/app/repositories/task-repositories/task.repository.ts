import { Task } from '@models';
import { Inject } from '@nestjs/common';
import { inject } from 'src/app/extras/functions';
import { TASK_REPOSITORY } from 'src/app/types';
import { Connection } from 'typeorm';

export class TaskRepository {
    constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
    }
    public static readonly inject = inject(TASK_REPOSITORY, TaskRepository);
    public readonly useHTTP = () => {
      return this.connection.getRepository(Task);
    }
  }