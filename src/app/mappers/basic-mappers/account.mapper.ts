import { Account, Role } from "@models";
import { AutoMapper, mapFrom, ProfileBase } from "@nartc/automapper";
import { AccountCM, AccountUM, AccountVM, RoleVM } from "@view-models";

export class AccountMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Account, AccountVM)
    .forMember(d => d.roles, mapFrom( s => mapper.mapArray(s.roles, RoleVM, Role)));
    mapper.createMap(AccountCM, Account);
    mapper.createMap(AccountUM, AccountVM);
  }
}