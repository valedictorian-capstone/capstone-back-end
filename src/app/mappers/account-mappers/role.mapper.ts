import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { RoleUM, RoleVM } from "@view-models";
import { Role } from "src/app/models/account-models/role.model";

export class RoleMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Role, RoleVM);
    mapper.createMap(RoleUM, RoleVM);
  }
}