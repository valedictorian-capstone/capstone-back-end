import { Customer } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { CustomerUM, CustomerVM, GroupVM, TicketVM, DealVM, NotificationVM, DeviceVM, CommentVM } from "@view-models";

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
      .forMember(d => d.notifications,
        preCondition((s) => s.notifications != null, []),
        mapWith(NotificationVM, s => s.notifications))
      .forMember(d => d.devices,
        preCondition((s) => s.devices != null, []),
        mapWith(DeviceVM, s => s.devices)
      )
      .forMember(d => d.deals,
        preCondition((s) => s.deals != null, []),
        mapWith(DealVM, s => s.deals)
      ).forMember(d => d.comments,
        preCondition(s => s.comments != null, []),
        mapWith(CommentVM, s => s.comments)
      );
    mapper.createMap(CustomerUM, CustomerVM);
  }
}