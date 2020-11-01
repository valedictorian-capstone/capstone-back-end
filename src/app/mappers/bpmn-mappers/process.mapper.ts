import { Process, ProcessStep, ProcessConnection } from '@models';
import { AutoMapper, mapFrom, mapWith, ProfileBase } from "@nartc/automapper";
import { ProcessCM, ProcessConnectionVM, ProcessStepVM, ProcessUM, ProcessVM } from "@view-models";

export class ProcessMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Process, ProcessVM)
      .forMember(d => d.processSteps, mapFrom(d => mapper.mapArray(d.processSteps, ProcessStepVM, ProcessStep)))
      .forMember(d => d.processConnections, mapFrom(d => mapper.mapArray(d.processConnections, ProcessConnectionVM, ProcessConnection)))
      .forMember(d => d.props, mapFrom(d => d.props ))
    // .forMember(d => d.processInstances, mapWith(ProcessVM, s => s.processInstances))
    // .forMember(d => d.processConditions, mapWith(ProcessVM, s => s.processConditions));
    mapper.createMap(ProcessUM, ProcessVM);
    mapper.createMap(ProcessCM, Process);
  }
}