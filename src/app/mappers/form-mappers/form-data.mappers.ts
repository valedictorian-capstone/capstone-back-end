import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { FormData } from "@models";
import { FormDataUM, FormDataVM } from "@view-models";

export class FormDataMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(FormData, FormDataVM);
      mapper.createMap(FormDataUM, FormDataVM);
    }
  }