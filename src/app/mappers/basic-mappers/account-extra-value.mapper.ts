import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { AccountExtraValue } from "@models";
import { AccountExtraValueUM, AccountExtraValueVM } from "@view-models";

export class AccountExtraValueMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(AccountExtraValue, AccountExtraValueVM)
      .forMember(d => d.accountExtraInformation, mapWith(AccountExtraValueVM, s => s.accountExtraInformation))
      .forMember(d => d.account, mapWith(AccountExtraValueVM, s => s.account));
    mapper.createMap(AccountExtraValueUM, AccountExtraValueVM);
  }
}