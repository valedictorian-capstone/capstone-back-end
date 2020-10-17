import { WFStepInstance } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { WFStepInstanceVM, WFStepUM, WFStepVM } from "@view-models";

export class WFStepInstanceMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(WFStepInstance, WFStepInstanceVM);
    // mapper.createMap(WFStepUM, WFStepVM);
  }
}