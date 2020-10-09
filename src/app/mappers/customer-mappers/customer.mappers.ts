import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { Customer } from "@models";
import { CustomerUM, CustomerVM } from "@view-models";

export class CustomerMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Customer, CustomerVM)
      .forMember(d => d.groups, mapWith(CustomerVM, s => s.groups))
      .forMember(d => d.wfInstances, mapWith(CustomerVM, s => s.wfInstances))
      .forMember(d => d.customerExtraInformationDatas, mapWith(CustomerVM, s => s.customerExtraInformationDatas));
    mapper.createMap(CustomerUM, CustomerVM);
  }
}