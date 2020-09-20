import { WFStep } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { WFStepUM, WFStepVM } from "@view-models";

export class WFStepMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(WFStep, WFStepVM);
    mapper.createMap(WFStepUM, WFStepVM);
  }
}