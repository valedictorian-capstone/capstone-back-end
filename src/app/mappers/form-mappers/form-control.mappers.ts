import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { FormControl } from "@models";
import { FormControlUM, FormControlVM } from "@view-models";

export class FormControlMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(FormControl, FormControlVM)
      .forMember(d => d.formValues, mapWith(FormControlVM, s => s.formValues))
      .forMember(d => d.formGroup, mapWith(FormControlVM, s => s.formGroup));
    mapper.createMap(FormControlUM, FormControlVM);
  }
}