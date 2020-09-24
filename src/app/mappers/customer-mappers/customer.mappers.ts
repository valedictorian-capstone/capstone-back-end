import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { Customer } from "@models";
import { CustomerUM, CustomerVM } from "@view-models";

export class CustomerMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Customer, CustomerVM)
      .forMember(d => d.groups, mapWith(CustomerVM, s => s.groups))
      .forMember(d => d.wFInstances, mapWith(CustomerVM, s => s.wFInstances))
      .forMember(d => d.customerExtraInformations, mapWith(CustomerVM, s => s.customerExtraInformations))
      .forMember(d => d.customerExtraDatas, mapWith(CustomerVM, s => s.customerExtraDatas));
    mapper.createMap(CustomerUM, CustomerVM);
  }
}