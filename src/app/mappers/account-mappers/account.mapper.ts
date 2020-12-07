import { Account } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { AccountUM, AccountVM, ActivityVM, DeviceVM, NotificationVM, RoleVM, TicketVM } from "@view-models";

export class AccountMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Account, AccountVM)
      .forMember(d => d.roles,
        preCondition((s) => s.roles != null, []),
        mapWith(RoleVM, s => s.roles)
    )
    .forMember(d => d.notifications,
      preCondition((s) => s.notifications != null, []),
      mapWith(NotificationVM, s => s.notifications)
    )
      .forMember(d => d.activitys,
        preCondition((s) => s.activitys != null, []),
        mapWith(ActivityVM, s => s.activitys)
      )
      .forMember(d => d.feedbackTickets,
        preCondition((s) => s.feedbackTickets != null, []),
        mapWith(TicketVM, s => s.feedbackTickets)
      )
      .forMember(d => d.tickets,
        preCondition((s) => s.tickets != null, []),
        mapWith(TicketVM, s => s.tickets)
      )
      .forMember(d => d.devices,
        preCondition((s) => s.devices != null, []),
        mapWith(DeviceVM, s => s.devices)
      );
    mapper.createMap(AccountUM, AccountVM);
  }
}