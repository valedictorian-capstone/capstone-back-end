import { inject } from "@extras/functions";
import { Stage } from "@models";
import { Inject } from "@nestjs/common";
import { STAGE_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class StageRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(STAGE_REPOSITORY, StageRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Stage);
  }
}
