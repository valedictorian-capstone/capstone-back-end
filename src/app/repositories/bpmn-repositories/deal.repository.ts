import { inject } from "@extras/functions";
import { Inject } from "@nestjs/common";
import { DEAL_REPOSITORY } from "@types";
import { Deal } from "@models";
import { Connection } from "typeorm";

export class DealRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(DEAL_REPOSITORY, DealRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Deal);
  }
}
