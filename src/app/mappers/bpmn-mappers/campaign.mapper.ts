import { Campaign } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { StageVM, CampaignUM, CampaignVM} from "@view-models";

export class CampaignMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Campaign, CampaignVM)
      .forMember(d => d.groups,
        preCondition((s) => s.groups != null, []),
        mapWith(StageVM, s => s.groups)
      );
    mapper.createMap(CampaignUM, CampaignVM);
  }
}