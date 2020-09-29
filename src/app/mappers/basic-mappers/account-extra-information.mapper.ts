import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { AccountExtraInformation } from "@models";
import { AccountExtraInformationUM, AccountExtraInformationVM } from "@view-models";

export class AccountExtraInformationMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(AccountExtraInformation, AccountExtraInformationVM)
      .forMember(d => d.accountExtraValues, mapWith(AccountExtraInformationVM, s => s.accountExtraValues))
    mapper.createMap(AccountExtraInformationUM, AccountExtraInformationVM);
  }
}