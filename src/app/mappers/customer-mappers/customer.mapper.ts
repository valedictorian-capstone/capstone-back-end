import { Customer } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { CustomerUM, CustomerVM, GroupVM } from "@view-models";

export class CustomerMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Customer, CustomerVM)
    .forMember(d => d.groups, preCondition((s) => s.groups != null, []),
    mapWith(GroupVM, s => s.groups))
    mapper.createMap(CustomerUM, CustomerVM);
  }
}