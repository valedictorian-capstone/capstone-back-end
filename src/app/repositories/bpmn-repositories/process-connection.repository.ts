import { inject } from "@extras/functions";
import { ProcessConnection } from "@models";
import { Inject } from "@nestjs/common";
import { PROCESS_CONNECTION_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class ProcessConnectionRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PROCESS_CONNECTION_REPOSITORY, ProcessConnectionRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(ProcessConnection);
  }
}
