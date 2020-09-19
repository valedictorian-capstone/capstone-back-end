import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { FormGroup } from "@models";
import { FormGroupUM, FormGroupVM } from "@view-models";

export class FormGroupMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(FormGroup, FormGroupVM);
      mapper.createMap(FormGroupUM, FormGroupVM);
    }
  }