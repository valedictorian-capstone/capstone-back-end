import { Activity } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { EmployeeVM, ActivityUM, ActivityVM, DealVM, CampaignVM } from "@view-models";

export class ActivityMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Activity, ActivityVM)
      .forMember(
        d => d.assignee,
        mapWith(EmployeeVM, s => s.assignee)
      )
      .forMember(
        d => d.deal,
        mapWith(DealVM, s => s.deal)
      )
      .forMember(
        d => d.assignBy,
        mapWith(EmployeeVM, s => s.assignBy)
      )
      .forMember(d => d.campaign,
        preCondition(s => s.campaign != null),
        mapWith(CampaignVM, s => s.campaign)
      );
    mapper.createMap(ActivityUM, ActivityVM);
  }
}