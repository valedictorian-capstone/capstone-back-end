import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { Group } from "@models";
import { GroupUM, GroupVM, CustomerVM, EventVM, CampaignVM } from "@view-models";

export class GroupMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Group, GroupVM)
      .forMember(d => d.customers, mapWith(CustomerVM, s => s.customers))
      .forMember(d => d.events, mapWith(EventVM, s => s.events))
      .forMember(d => d.campaigns, mapWith(CampaignVM, s => s.campaigns))
    mapper.createMap(GroupUM, GroupVM);
  }
}