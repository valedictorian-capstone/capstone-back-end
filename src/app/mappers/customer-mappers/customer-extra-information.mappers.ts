import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { CustomerExtraInformation } from "@models";
import { CustomerExtraInformationUM, CustomerExtraInformationVM } from "@view-models";

export class CustomerExtraInformationMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CustomerExtraInformation, CustomerExtraInformationVM)
      .forMember(d => d.customer, mapWith(CustomerExtraInformationVM, s => s.customer))
      .forMember(d => d.customerExtraInformationDatas, mapWith(CustomerExtraInformationVM, s => s.customerExtraInformationDatas));
    mapper.createMap(CustomerExtraInformationUM, CustomerExtraInformationVM);
  }
}