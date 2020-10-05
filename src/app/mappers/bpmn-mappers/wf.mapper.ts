import { WF, WFStep, WFConnection } from '@models';
import { AutoMapper, mapFrom, mapWith, ProfileBase } from "@nartc/automapper";
import { WFCM, WFConnectionVM, WFStepVM, WFUM, WFVM } from "@view-models";

export class WFMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(WF, WFVM)
      .forMember(d => d.workFlowSteps, mapFrom(d => mapper.mapArray(d.wFSteps, WFStepVM, WFStep)))
      .forMember(d => d.workFlowConnections, mapFrom(d => mapper.mapArray(d.wfConnections, WFConnectionVM, WFConnection)))
      .forMember(d => d.props, mapFrom(d => d.props ))
    // .forMember(d => d.wFInstances, mapWith(WFVM, s => s.wFInstances))
    // .forMember(d => d.wFConditions, mapWith(WFVM, s => s.wFConditions));
    mapper.createMap(WFUM, WFVM);
    mapper.createMap(WFCM, WF);
  }
}