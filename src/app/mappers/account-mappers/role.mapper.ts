import { AutoMapper, ProfileBase } from '@nartc/automapper';
import { AccountVM, RoleUM, RoleVM } from "@view-models";
import { preCondition, mapWith } from 'nestjsx-automapper';
import { Role } from "src/app/models/account-models/role.model";

export class RoleMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Role, RoleVM)
    .forMember(d => d.accounts,
      preCondition((s) => s.accounts != null, []),
      mapWith(AccountVM, s => s.accounts)
    );
    mapper.createMap(RoleUM, RoleVM);
  }
}