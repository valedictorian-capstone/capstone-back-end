import { Account } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { AccountDepartmentVM, AccountUM, AccountVM, RoleVM } from "@view-models";

export class AccountMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Account, AccountVM)
      .forMember(d => d.accountDepartments,
        preCondition((s) => s.accountDepartments != null, []),
        mapWith(AccountDepartmentVM, s => s.accountDepartments)
      )
      .forMember(d => d.roles,
        preCondition((s) => s.roles != null, []),
        mapWith(RoleVM, s => s.roles)
      )
    mapper.createMap(AccountUM, AccountVM);
  }
}