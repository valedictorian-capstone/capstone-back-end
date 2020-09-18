import { ProfileBase, AutoMapper } from "@nartc/automapper";
import { Account } from "@models";
import { AccountUM, AccountVM } from "@view-models";
import { Profile } from "nestjsx-automapper";

export class AccountMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Account, AccountVM);
    mapper.createMap(AccountUM, AccountVM);
  }
}