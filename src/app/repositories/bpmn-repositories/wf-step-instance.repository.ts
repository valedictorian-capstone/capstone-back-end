import { inject } from "@extras/functions";
import { WFStepInstance } from "@models";
import { Inject } from "@nestjs/common";
import { WF_STEP_INSTANCE_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class WFStepInstanceRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(WF_STEP_INSTANCE_REPOSITORY, WFStepInstanceRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(WFStepInstance);
  }
}
