import { Process } from '@models';
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { ProcessCM, ProcessConnectionVM, ProcessStepVM, ProcessUM, ProcessVM } from "@view-models";

export class ProcessMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Process, ProcessVM)
      .forMember(d => d.processSteps,
        preCondition(s => s.processSteps != null),
        mapWith(ProcessStepVM, s => s.processSteps)
      )
      .forMember(d => d.processConnections,
        preCondition(s => s.processConnections != null),
        mapWith(ProcessConnectionVM, s => s.processConnections)
      );
    // .forMember(d => d.processInstances, mapWith(ProcessVM, s => s.processInstances))
    // .forMember(d => d.processConditions, mapWith(ProcessVM, s => s.processConditions));
    mapper.createMap(ProcessUM, ProcessVM);
    mapper.createMap(ProcessCM, Process);
  }
}