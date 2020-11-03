import { ProcessStep } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { DepartmentVM, ProcessConnectionVM, ProcessStepUM, ProcessStepVM, ProcessVM } from "@view-models";

export class ProcessStepMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProcessStep, ProcessStepVM)
      .forMember(d => d.process,
        preCondition((s) => s.process != null),
        mapWith(ProcessVM, s => s.process)
      )
      .forMember(d => d.processFromConnections,
        preCondition((s) => s.processFromConnections != null, []),
        mapWith(ProcessConnectionVM, s => s.processFromConnections)
      )
      .forMember(d => d.processToConnections,
        preCondition((s) => s.processToConnections != null, []),
        mapWith(ProcessConnectionVM, s => s.processToConnections)
      )
      .forMember(d => d.department,
        preCondition((s) => s.department != null),
        mapWith(DepartmentVM, s => s.department)
      );
    mapper.createMap(ProcessStepUM, ProcessStepVM);
  }
}