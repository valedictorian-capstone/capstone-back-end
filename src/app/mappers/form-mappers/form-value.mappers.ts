import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { FormValue } from "@models";
import { FormValueUM, FormValueVM } from "@view-models";
import { mapWith } from "nestjsx-automapper";

export class FormValueMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(FormValue, FormValueVM)
      .forMember(d => d.formData, mapWith(FormValueVM, s => s.formData))
      .forMember(d => d.formControl, mapWith(FormValueVM, s => s.formControl));
    mapper.createMap(FormValueUM, FormValueVM);
  }
}