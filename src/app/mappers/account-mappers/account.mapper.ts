import { Account } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { AccountUM, AccountVM, ActivityVM, DeviceVM, RoleVM } from "@view-models";

export class AccountMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Account, AccountVM)
      .forMember(d => d.roles,
        preCondition((s) => s.roles != null, []),
        mapWith(RoleVM, s => s.roles)
      )
      .forMember(d => d.acvivitys,
        preCondition((s) => s.activitys != null, []),
        mapWith(ActivityVM, s => s.activitys)
      )
      .forMember(d => d.devices,
        preCondition((s) => s.devices != null, []),
        mapWith(DeviceVM, s => s.devices)
      );
    mapper.createMap(AccountUM, AccountVM);
  }
}