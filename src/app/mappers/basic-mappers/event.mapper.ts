import { Event } from "@models";
import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { EventUM, EventVM } from "@view-models";
export class EventMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Event, EventVM)
          .forMember(d => d.groups, mapWith(EventVM, s => s.groups))
        mapper.createMap(EventUM, EventVM);
      }
}