import { AccountExtraInformationData } from "@models";
import { AutoMapper, ProfileBase, mapWith } from '@nartc/automapper';
import { AccountExtraInformationDataUM, AccountExtraInformationDataVM, AccountVM, ExtraInformationVM } from "@view-models";

export class AccountExtraInformationDataMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(AccountExtraInformationData, AccountExtraInformationDataVM)
      .forMember(d => d.account, mapWith(AccountVM, s => s.account))
      .forMember(d => d.extraInformation, mapWith(ExtraInformationVM, s => s.extraInformation));
    mapper.createMap(AccountExtraInformationDataUM, AccountExtraInformationDataVM);
  }
}