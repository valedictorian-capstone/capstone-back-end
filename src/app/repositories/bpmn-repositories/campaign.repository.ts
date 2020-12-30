import { inject } from "@extras/functions";
import { Campaign } from "@models";
import { Inject } from "@nestjs/common";
import { CAMPAIGN_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class CampaignRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(CAMPAIGN_REPOSITORY, CampaignRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(Campaign);
  }
}