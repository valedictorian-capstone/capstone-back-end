import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { FormControl, FormData, FormGroup, WFStep } from "@models";
import { FormControlVM, FormDataVM, FormGroupUM, FormGroupVM, WFStepVM } from "@view-models";
import { mapFrom } from "nestjsx-automapper";

export class FormGroupMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
      super();
      mapper.createMap(FormGroup, FormGroupVM)
      .forMember(d => d.formDatas, mapFrom(s => mapper.mapArray(s.formDatas, FormDataVM, FormData)))
      .forMember(d => d.formControls, mapFrom( s => mapper.mapArray(s.formControls, FormControlVM, FormControl)))
      .forMember(d => d.wFSteps, mapFrom(s => mapper.mapArray(s.wfSteps, WFStepVM, WFStep)));
      mapper.createMap(FormGroupUM, FormGroupVM);
    }
  }