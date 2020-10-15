import { Account } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { AccountDepartmentVM, AccountExtraInformationDataVM, AccountUM, AccountVM, RoleVM } from "@view-models";

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
      .forMember(d => d.accountExtraInformationDatas,
        preCondition((s) => s.accountExtraInformationDatas != null, []),
        mapWith(AccountExtraInformationDataVM, s => s.accountExtraInformationDatas)
      );
    mapper.createMap(AccountUM, AccountVM);
  }
}