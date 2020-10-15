import { Customer, CustomerExtraInformationData } from "@models";
import { AutoMapper, mapFrom, mapWith, ProfileBase } from '@nartc/automapper';
import { CustomerExtraInformationDataVM, CustomerUM, CustomerVM } from "@view-models";

export class CustomerMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Customer, CustomerVM)
      .forMember(d => d.groups, mapWith(CustomerVM, s => s.groups))
      .forMember(d => d.wFInstances, mapWith(CustomerVM, s => s.wFInstances))
      .forMember(d => d.customerExtraInformationDatas,
        mapFrom(s => s.customerExtraInformationDatas !== undefined ? mapper.mapArray(s.customerExtraInformationDatas, CustomerExtraInformationDataVM, CustomerExtraInformationData) : [])
      )
    mapper.createMap(CustomerUM, CustomerVM);
  }
}