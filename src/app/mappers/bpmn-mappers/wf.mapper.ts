import { WF } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { WFUM, WFVM } from "@view-models";

export class WFMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(WF, WFVM);
    mapper.createMap(WFUM, WFVM);
  }
}