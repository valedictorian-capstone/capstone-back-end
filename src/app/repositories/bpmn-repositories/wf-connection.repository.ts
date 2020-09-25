import { inject } from "@extras/functions";
import { WFConnection } from "@models";
import { Inject } from "@nestjs/common";
import { WF_CONNECTION_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class WFConnectionRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(WF_CONNECTION_REPOSITORY, WFConnectionRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(WFConnection);
  }
}
