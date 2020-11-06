import { ProcessConnection } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { ProcessConnectionUM, ProcessConnectionVM, ProcessStepVM } from "@view-models";
import { preCondition, mapWith } from "nestjsx-automapper";

export class ProcessConnectionMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProcessConnection, ProcessConnectionVM)
    .forMember(d => d.toProcessStep,
      preCondition((s) => s.toProcessStep != null),
      mapWith(ProcessStepVM, s => s.toProcessStep)
    )
    .forMember(d => d.fromProcessStep,
      preCondition((s) => s.fromProcessStep != null),
      mapWith(ProcessStepVM, s => s.fromProcessStep)
    )
    mapper.createMap(ProcessConnectionUM, ProcessConnectionVM);
  }
}