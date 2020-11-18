import { inject } from "@extras/functions";
import { Pipeline } from "@models";
import { Inject } from "@nestjs/common";
import { PIPELINE_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class PipelineRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(PIPELINE_REPOSITORY, PipelineRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Pipeline);
  }
}
