import { Notification } from "@models";
import { AutoMapper, ProfileBase, mapWith, mapFrom } from '@nartc/automapper';
import { EmployeeVM, CustomerVM, NotificationUM, NotificationVM } from "@view-models";

export class NotificationMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Notification, NotificationVM)
      .forMember(d => d.employee, mapWith(EmployeeVM, s => s.employee))
      .forMember(d => d.customer, mapWith(CustomerVM, s => s.customer))
      .forMember(d => d.data, mapFrom(s => s.data));
    mapper.createMap(NotificationUM, NotificationVM);
  }
}