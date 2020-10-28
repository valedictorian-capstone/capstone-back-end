import { Customer } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { CustomerUM, CustomerVM, OrderRequestVM } from "@view-models";

export class CustomerMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Customer, CustomerVM)
    .forMember(d => d.orderRequests,
      preCondition((s) => s.orderRequests != null, []),
      mapWith(OrderRequestVM, s => s.orderRequests)
    );
    mapper.createMap(CustomerUM, CustomerVM);
  }
}