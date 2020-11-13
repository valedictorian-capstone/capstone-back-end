import { Activity } from "@models";
import { AutoMapper, mapWith, ProfileBase } from "@nartc/automapper";
import { AccountVM, ActivityUM, ActivityVM, ProcessInstanceVM } from "@view-models";

export class ActivityMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Activity, ActivityVM)
      .forMember(
        d => d.assignee,
        mapWith(AccountVM, s => s.assignee)
      )
      .forMember(
        d => d.processInstance,
        mapWith(ProcessInstanceVM, s => s.processInstance)
      )
      .forMember(
        d => d.assignBy,
        mapWith(AccountVM, s => s.assignBy)
      );
    mapper.createMap(ActivityUM, ActivityVM);
  }
}