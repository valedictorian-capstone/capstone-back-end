import { Role } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { RoleUM, RoleVM } from "@view-models";

export class RoleMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Role, RoleVM);
    mapper.createMap(RoleUM, RoleVM);
  }
}