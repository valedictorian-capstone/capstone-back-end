import { inject } from "@extras/functions";
import { Inject } from "@nestjs/common";
import { PROCESS_INSTANCE_REPOSITORY } from "@types";
import { ProcessInstance } from "@models";
import { Connection } from "typeorm";

export class ProcessInstanceRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PROCESS_INSTANCE_REPOSITORY, ProcessInstanceRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(ProcessInstance);
  }
}
