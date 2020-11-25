import { Trigger } from "@models";
import { ProfileBase, AutoMapper, mapWith, preCondition } from "@nartc/automapper";
import { TriggerUM, TriggerVM } from "@view-models";
export class TriggerMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Trigger, TriggerVM)
          .forMember(d => d.event,
            preCondition((s) => s.event != null, undefined),
            mapWith(TriggerVM, s => s.event)
          );
        mapper.createMap(TriggerUM, TriggerVM);
      }
}