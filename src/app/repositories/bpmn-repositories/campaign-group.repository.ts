import { inject } from "@extras/functions";
import { CampaignGroup } from "@models";
import { Inject } from "@nestjs/common";
import { CAMPAIGN_GROUP_REPOSITORY } from "@types";
import { Connection } from "typeorm";

export class CampaignGroupRepository {
  constructor(@Inject('DATABASE_CONNECTION') protected readonly connection: Connection) {
  }
  public static readonly inject = inject(CAMPAIGN_GROUP_REPOSITORY, CampaignGroupRepository);
  public readonly useHTTP = () => {
    return this.connection.getRepository(CampaignGroup);
  }
}