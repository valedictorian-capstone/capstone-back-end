import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { FormGroup } from "@models";
import { FormControlVM, FormGroupUM, FormGroupVM } from "@view-models";
import { mapWith } from "nestjsx-automapper";

export class FormGroupMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(FormGroup, FormGroupVM)
      .forMember(d => d.formDatas, mapWith(FormGroupVM, s => s.formDatas))
      .forMember(d => d.formControls, mapWith(FormGroupVM, s => s.formControls))
      .forMember(d => d.wFSteps, mapWith(FormGroupVM, s => s.wfSteps));
      mapper.createMap(FormGroupUM, FormGroupVM);
    }
  }