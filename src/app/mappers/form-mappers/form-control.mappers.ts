import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { FormControl } from "@models";
import { FormControlUM, FormControlVM } from "@view-models";

export class FormControlMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(FormControl, FormControlVM);
      mapper.createMap(FormControlUM, FormControlVM);
    }
  }