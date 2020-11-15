import { Activity } from "@models";
import { AutoMapper, mapWith, ProfileBase } from "@nartc/automapper";
import { AccountVM, ActivityUM, ActivityVM, DealVM } from "@view-models";

export class ActivityMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Activity, ActivityVM)
      .forMember(
        d => d.assignee,
        mapWith(AccountVM, s => s.assignee)
      )
      .forMember(
        d => d.deal,
        mapWith(DealVM, s => s.deal)
      )
      .forMember(
        d => d.assignBy,
        mapWith(AccountVM, s => s.assignBy)
      );
    mapper.createMap(ActivityUM, ActivityVM);
  }
}