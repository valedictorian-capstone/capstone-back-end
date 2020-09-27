import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { Department } from "@models";
import { DepartmentUM, DepartmentVM } from "@view-models";
import { mapWith } from "nestjsx-automapper";

export class DepartmentMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Department, DepartmentVM)
      .forMember(d => d.departmentChildrens, mapWith(DepartmentVM, s => s.departmentChildrens))
      .forMember(d => d.departmentParent, mapWith(DepartmentVM, s => s.departmentParent))
      .forMember(d => d.accounts, mapWith(DepartmentVM, s => s.accounts));
    mapper.createMap(DepartmentVM, DepartmentVM)
      .forMember(d => d.departmentChildrens, mapWith(DepartmentVM, s => s.departmentChildrens))
      .forMember(d => d.departmentParent, mapWith(DepartmentVM, s => s.departmentParent));
    mapper.createMap(DepartmentUM, DepartmentVM);
  }
}