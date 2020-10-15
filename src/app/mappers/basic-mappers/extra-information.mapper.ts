import { ExtraInformation } from "@models";
import { AutoMapper, mapFrom, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { AccountExtraInformationDataVM, CustomerExtraInformationDataVM, ExtraInformationUM, ExtraInformationVM, ProductExtraInformationDataVM } from "@view-models";

export class ExtraInformationMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ExtraInformation, ExtraInformationVM)
      .forMember(d => d.options, mapFrom(s => s.options))
      .forMember(d => d.customerExtraInformationDatas,
        preCondition((s) => s.customerExtraInformationDatas != null, []),
        mapWith(CustomerExtraInformationDataVM, s => s.customerExtraInformationDatas)
      )
      .forMember(d => d.accountExtraInformationDatas,
        preCondition((s) => s.accountExtraInformationDatas != null, []),
        mapWith(AccountExtraInformationDataVM, s => s.accountExtraInformationDatas)
      )
      .forMember(d => d.productExtraInformationDatas,
        preCondition((s) => s.productExtraInformationDatas != null, []),
        mapWith(ProductExtraInformationDataVM, s => s.productExtraInformationDatas)
      );
    mapper.createMap(ExtraInformationUM, ExtraInformationVM);
  }
}