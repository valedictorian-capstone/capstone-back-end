import { Ticket } from "@models";
import { AutoMapper, mapWith, ProfileBase } from '@nartc/automapper';
import { CustomerVM, TicketUM, TicketVM, EmployeeVM } from "@view-models";

export class TicketMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Ticket, TicketVM)
        .forMember(d => d.customer, mapWith(CustomerVM, s => s.customer))
        .forMember(d => d.assignee, mapWith(EmployeeVM, s => s.assignee))
        .forMember(d => d.feedbackAssignee, mapWith(EmployeeVM, s => s.feedbackAssignee))
        mapper.createMap(TicketUM, TicketVM);
      }
}