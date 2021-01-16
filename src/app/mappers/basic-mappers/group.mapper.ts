import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { Group } from "@models";
import { GroupUM, GroupVM, CustomerVM, EventVM, CampaignGroupVM } from "@view-models";

export class GroupMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Group, GroupVM)
      .forMember(d => d.customers, mapWith(CustomerVM, s => s.customers))
      .forMember(d => d.events, mapWith(EventVM, s => s.events))
      .forMember(d => d.campaignGroups, mapWith(CampaignGroupVM, s => s.campaignGroups))
    mapper.createMap(GroupUM, GroupVM);
  }
}