import { ProcessStep } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { ProcessStepUM, ProcessStepVM } from "@view-models";

export class ProcessStepMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProcessStep, ProcessStepVM);
    mapper.createMap(ProcessStepUM, ProcessStepVM);
  }
}