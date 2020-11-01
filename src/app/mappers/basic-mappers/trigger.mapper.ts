import { Trigger } from "@models";
import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { TriggerUM, TriggerVM } from "@view-models";
export class TriggerMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Trigger, TriggerVM)
          .forMember(d => d.groups, mapWith(TriggerVM, s => s.groups))
        mapper.createMap(TriggerUM, TriggerVM);
      }
}