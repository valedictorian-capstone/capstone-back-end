import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { Role } from "@models";
import { RoleUM, RoleVM } from "@view-models";
import { Profile } from "nestjsx-automapper";

export class RoleMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Role, RoleVM);
    mapper.createMap(RoleUM, RoleVM);
  }
}