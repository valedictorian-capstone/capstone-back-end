import { inject } from "@extras/functions";
import { Inject } from "@nestjs/common";
import { DEAL_DETAIL_REPOSITORY } from "@types";
import { DealDetail } from "@models";
import { Connection } from "typeorm";

export class DealDetailRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(DEAL_DETAIL_REPOSITORY, DealDetailRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(DealDetail);
  }
}
