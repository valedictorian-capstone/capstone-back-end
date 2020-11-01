import { inject } from "@extras/functions";
import { ProcessStepInstance } from "@models";
import { Inject } from "@nestjs/common";
import { PROCESS_STEP_INSTANCE_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class ProcessStepInstanceRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PROCESS_STEP_INSTANCE_REPOSITORY, ProcessStepInstanceRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(ProcessStepInstance);
  }
}
