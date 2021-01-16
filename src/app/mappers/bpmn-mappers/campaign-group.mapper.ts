import { CampaignGroup } from "@models";
import { CampaignGroupUM, CampaignGroupVM, CampaignVM, GroupVM } from "@view-models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "nestjsx-automapper";

export class CampaignGroupMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(CampaignGroup, CampaignGroupVM)
          .forMember(d => d.campaign,
            preCondition((s) => s.campaign != null),
            mapWith(CampaignVM, s => s.campaign)
          ).forMember(d => d.group,
            preCondition((s) => s.group != null),
            mapWith(GroupVM, s => s.group)
          );
        mapper.createMap(CampaignGroupUM, CampaignGroupVM);
      }
}