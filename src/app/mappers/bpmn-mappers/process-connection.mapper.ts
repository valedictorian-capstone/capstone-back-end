import { ProcessConnection } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { ProcessConnectionUM, ProcessConnectionVM } from "@view-models";

export class ProcessConnectionMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProcessConnection, ProcessConnectionVM);
    mapper.createMap(ProcessConnectionUM, ProcessConnectionVM);
  }
}