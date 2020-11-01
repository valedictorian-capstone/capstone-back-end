import { inject } from "@extras/functions";
import { ProcessStep } from "@models";
import { Inject } from "@nestjs/common";
import { PROCESS_STEP_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class ProcessStepRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PROCESS_STEP_REPOSITORY, ProcessStepRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(ProcessStep);
  }
}
