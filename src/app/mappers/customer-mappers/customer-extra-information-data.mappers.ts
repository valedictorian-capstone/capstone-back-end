import { Customer, CustomerExtraInformation, CustomerExtraInformationData } from "@models";
import { AutoMapper, mapFrom, ProfileBase } from '@nartc/automapper';
import { CustomerExtraInformationDataUM, CustomerExtraInformationDataVM, CustomerExtraInformationVM, CustomerVM } from "@view-models";

export class CustomerExtraInformationDataMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CustomerExtraInformationData, CustomerExtraInformationDataVM)
      .forMember(d => d.customerExtraInformation, mapFrom(s => mapper.map(s.customerExtraInformation, CustomerExtraInformationVM, CustomerExtraInformation)))
      .forMember(d => d.customer, mapFrom(s => mapper.map(s.customer, CustomerVM, Customer)));
    mapper.createMap(CustomerExtraInformationDataUM, CustomerExtraInformationDataVM);
  }
}