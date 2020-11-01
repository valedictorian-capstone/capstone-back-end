import { ProfileBase, AutoMapper, preCondition, mapWith } from "@nartc/automapper";
import { FormGroup } from "@models";
import { FormControlVM, FormDataVM, FormGroupUM, FormGroupVM, ProcessStepVM } from "@view-models";

export class FormGroupMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(FormGroup, FormGroupVM)
      .forMember(d => d.formDatas, preCondition((s) => s.formDatas != null, []),
        mapWith(FormDataVM, s => s.formDatas))
      .forMember(d => d.formControls, preCondition((s) => s.formControls != null, []),
        mapWith(FormControlVM, s => s.formControls))
      .forMember(d => d.processSteps, preCondition((s) => s.processSteps != null, []),
        mapWith(ProcessStepVM, s => s.processSteps))
    mapper.createMap(FormGroupUM, FormGroupVM);
  }
}