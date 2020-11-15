import { Customer } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { CustomerUM, CustomerVM, GroupVM, TicketVM, DealVM } from "@view-models";

export class CustomerMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Customer, CustomerVM)
      .forMember(d => d.groups,
        preCondition((s) => s.groups != null, []),
        mapWith(GroupVM, s => s.groups))
      .forMember(d => d.tickets,
        preCondition((s) => s.tickets != null, []),
        mapWith(TicketVM, s => s.tickets)
      )
      .forMember(d => d.deals,
        preCondition((s) => s.deals != null, []),
        mapWith(DealVM, s => s.deals)
      );
    mapper.createMap(CustomerUM, CustomerVM);
  }
}