import { inject } from "@extras/functions";
import { WFStep } from "@models";
import { Inject } from "@nestjs/common";
import { WF_STEP_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class WFStepRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(WF_STEP_REPOSITORY, WFStepRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(WFStep);
  }
}
