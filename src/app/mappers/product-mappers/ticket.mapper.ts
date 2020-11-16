import { Ticket } from "@models";
import { AutoMapper, mapWith, ProfileBase } from '@nartc/automapper';
import { CustomerVM, TicketUM, TicketVM, AccountVM } from "@view-models";

export class TicketMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Ticket, TicketVM)
        .forMember(d => d.customer, mapWith(CustomerVM, s => s.customer))
        .forMember(d => d.assignee, mapWith(AccountVM, s => s.assignee))
        .forMember(d => d.feedbackAssignee, mapWith(AccountVM, s => s.feedbackAssignee))
        mapper.createMap(TicketUM, TicketVM);
      }
}