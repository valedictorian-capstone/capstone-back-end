import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { CustomerExtraInformationData } from "@models";
import { CustomerExtraInformationDataUM, CustomerExtraInformationDataVM } from "@view-models";

export class CustomerExtraInformationDataMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CustomerExtraInformationData, CustomerExtraInformationDataVM)
      .forMember(d => d.customerExtraInformation, mapWith(CustomerExtraInformationDataVM, s => s.customerExtraInformation))
      .forMember(d => d.customerExtraData, mapWith(CustomerExtraInformationDataVM, s => s.customerExtraData));
    mapper.createMap(CustomerExtraInformationDataUM, CustomerExtraInformationDataVM);
  }
}