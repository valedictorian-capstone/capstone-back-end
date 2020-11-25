import { Event } from "@models";
import { ProfileBase, AutoMapper, mapWith, preCondition } from "@nartc/automapper";
import { EventUM, EventVM, GroupVM, TriggerVM } from "@view-models";
export class EventMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Event, EventVM)
          .forMember(d => d.groups,
            preCondition((s) => s.groups != null, []),
            mapWith(GroupVM, s => s.groups)
          )
          .forMember(d => d.triggers,
            preCondition((s) => s.triggers != null, []),
            mapWith(TriggerVM, s => s.triggers)
          )
        mapper.createMap(EventUM, EventVM);
      }
}