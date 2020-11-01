import { ProcessStepInstance } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { ProcessStepInstanceVM, ProcessStepUM, ProcessStepVM } from "@view-models";

export class ProcessStepInstanceMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProcessStepInstance, ProcessStepInstanceVM);
    // mapper.createMap(ProcessStepUM, ProcessStepVM);
  }
}