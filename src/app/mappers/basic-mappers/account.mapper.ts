import { Account, Role } from "@models";
import { AutoMapper, mapFrom, mapWith, ProfileBase } from "@nartc/automapper";
import { AccountCM, AccountUM, AccountVM, RoleVM } from "@view-models";
import { mapWith } from "nestjsx-automapper";

export class AccountMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Account, AccountVM)
    .forMember(d => d.roles, mapFrom( s => mapper.mapArray(s.roles, RoleVM, Role)))
    .forMember(d => d.departments, mapWith(AccountVM, s => s.departments))
    .forMember(d => d.accountExtraValues, mapWith(AccountVM, s => s.accountExtraValues));
    mapper.createMap(AccountCM, Account);
    mapper.createMap(AccountUM, AccountVM);
  }
}