import { ProfileBase, AutoMapper, mapWith, mapFrom } from "@nartc/automapper";
import { FormData } from "@models";
import { FormDataUM, FormDataVM, FormGroupVM, WFStepInstanceVM } from "@view-models";

export class FormDataMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(FormData, FormDataVM)
      .forMember(d => d.wFStepInstance, mapWith(WFStepInstanceVM, s => s.wFStepInstance))
      .forMember(d => d.formGroup, mapWith(FormGroupVM, s => s.formGroup))
      .forMember(d => d.value, mapFrom(s => s.value));
      mapper.createMap(FormDataUM, FormDataVM);
    }
  }