import { inject } from "@extras/functions";
import { Inject } from "@nestjs/common";
import { LOG_REPOSITORY } from "@types";
import { Log } from "@models";
import { Connection } from "typeorm";

export class LogRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(LOG_REPOSITORY, LogRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Log);
  }
}
