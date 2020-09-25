import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { FormData } from "@models";
import { FormControlVM, FormDataUM, FormDataVM } from "@view-models";

export class FormDataMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(FormData, FormDataVM)
      .forMember(d => d.wFStepInstance, mapWith(FormDataVM, s => s.wFStepInstance))
      .forMember(d => d.formGroup, mapWith(FormDataVM, s => s.formGroup))
      .forMember(d => d.formValues, mapWith(FormDataVM, s => s.formValues));
      mapper.createMap(FormDataUM, FormDataVM);
    }
  }