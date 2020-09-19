import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { FormValue } from "@models";
import { FormValueUM, FormValueVM } from "@view-models";

export class FormValueMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(FormValue, FormValueVM);
      mapper.createMap(FormValueUM, FormValueVM);
    }
  }