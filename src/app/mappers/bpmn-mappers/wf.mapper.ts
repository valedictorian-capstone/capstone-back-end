import { WF, WFStep } from "@models";
import { AutoMapper, mapFrom, mapWith, ProfileBase } from "@nartc/automapper";
import { WFCM, WFStepVM, WFUM, WFVM } from "@view-models";

export class WFMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(WF, WFVM)
    .forMember(d => d.wFSteps, mapFrom( s => mapper.mapArray(s.wFSteps, WFStepVM, WFStep)))
    // .forMember(d => d.wFInstances, mapWith(WFVM, s => s.wFInstances))
    // .forMember(d => d.wFConditions, mapWith(WFVM, s => s.wFConditions));
    mapper.createMap(WFUM, WFVM);
    mapper.createMap(WFCM,WF);
  }
}