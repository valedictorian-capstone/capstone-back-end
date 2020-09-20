import { inject } from "@extras/functions";
import { Inject } from "@nestjs/common";
import { WF_INSTANCE_REPOSITORY } from "@types";
import { WFInstance } from "@models";
import { Connection } from "typeorm";

export class WFInstanceRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(WF_INSTANCE_REPOSITORY, WFInstanceRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(WFInstance);
  }
}
