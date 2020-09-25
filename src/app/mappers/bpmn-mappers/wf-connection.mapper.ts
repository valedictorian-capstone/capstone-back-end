import { WFConnection } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { WFConnectionUM, WFConnectionVM } from "@view-models";

export class WFConnectionMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(WFConnection, WFConnectionVM);
    mapper.createMap(WFConnectionUM, WFConnectionVM);
  }
}