import { CustomerExtraInformationData } from "@models";
import { AutoMapper, mapWith, ProfileBase } from '@nartc/automapper';
import { CustomerExtraInformationDataUM, CustomerExtraInformationDataVM, ExtraInformationVM, CustomerVM } from "@view-models";

export class CustomerExtraInformationDataMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CustomerExtraInformationData, CustomerExtraInformationDataVM)
      .forMember(d => d.customer, mapWith(CustomerVM, s => s.customer))
      .forMember(d => d.extraInformation, mapWith(ExtraInformationVM, s => s.extraInformation));
    mapper.createMap(CustomerExtraInformationDataUM, CustomerExtraInformationDataVM);
  }
}