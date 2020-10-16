import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { Department } from "@models";
import { DepartmentUM, DepartmentVM } from "@view-models";
import { mapWith } from "nestjsx-automapper";

export class DepartmentMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Department, DepartmentVM)
      .forMember(d => d.accountDepartments, mapWith(DepartmentVM, s => s.accountDepartments));
    mapper.createMap(DepartmentUM, DepartmentVM);
  }
}