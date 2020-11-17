import { inject } from "@extras/functions";
import { Process } from "@models";
import { Inject } from "@nestjs/common";
import { PROCESS_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class ProcessRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PROCESS_REPOSITORY, ProcessRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Process);
  }
}
