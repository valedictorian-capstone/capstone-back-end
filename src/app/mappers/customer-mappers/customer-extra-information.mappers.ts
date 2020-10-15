import { CustomerExtraInformation, CustomerExtraInformationData } from "@models";
import { AutoMapper, mapFrom, ProfileBase } from '@nartc/automapper';
import { CustomerExtraInformationDataVM, CustomerExtraInformationUM, CustomerExtraInformationVM } from "@view-models";

export class CustomerExtraInformationMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CustomerExtraInformation, CustomerExtraInformationVM)
      .forMember(d => d.options, mapFrom(s => s.options))
      .forMember(d => d.customerExtraInformationDatas,
        mapFrom(s => s.customerExtraInformationDatas !== undefined ? mapper.mapArray(s.customerExtraInformationDatas, CustomerExtraInformationDataVM, CustomerExtraInformationData) : [])
      );
    mapper.createMap(CustomerExtraInformationUM, CustomerExtraInformationVM);
  }
}