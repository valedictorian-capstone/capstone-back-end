import { inject } from "@extras/functions";
import { Inject } from "@nestjs/common";
import { WF_REPOSITORY } from "@types";
import { WF } from "src/app/models/bpmn-models/wf.model";
import { Connection } from "typeorm";

export class WFRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(WF_REPOSITORY, WFRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(WF);
  }
}
