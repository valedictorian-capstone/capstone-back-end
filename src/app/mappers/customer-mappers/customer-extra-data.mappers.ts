import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { CustomerExtraData } from "@models";
import { CustomerExtraDataUM, CustomerExtraDataVM } from "@view-models";

export class CustomerExtraDataMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CustomerExtraData, CustomerExtraDataVM)
      .forMember(d => d.customer, mapWith(CustomerExtraDataVM, s => s.customer))
      .forMember(d => d.customerExtraInformationDatas, mapWith(CustomerExtraDataVM, s => s.customerExtraInformationDatas));
    mapper.createMap(CustomerExtraDataUM, CustomerExtraDataVM);
  }
}