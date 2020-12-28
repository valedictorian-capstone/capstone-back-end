import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { EmployeeVM, RoleUM, RoleVM } from "@view-models";
import { preCondition, mapWith } from 'nestjsx-automapper';
import { Role } from "src/app/models/employee-models/role.model";

export class RoleMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Role, RoleVM)
    .forMember(d => d.employees,
      preCondition((s) => s.employees != null, []),
      mapWith(EmployeeVM, s => s.employees)
    );
    mapper.createMap(RoleUM, RoleVM);
  }
}