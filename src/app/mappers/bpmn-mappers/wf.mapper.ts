import { WF } from "@models";
import { AutoMapper, mapWith, ProfileBase } from "@nartc/automapper";
import { WFUM, WFVM } from "@view-models";

export class WFMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(WF, WFVM)
    .forMember(d => d.wFStepVMs, mapWith(WFVM, s => s.wFSteps))
    // .forMember(d => d.wFInstanceVMs, mapWith(WFVM, s => s.wFInstances))
    // .forMember(d => d.wFConditionVMs, mapWith(WFVM, s => s.wFConditions));
    mapper.createMap(WFUM, WFVM);
  }
}