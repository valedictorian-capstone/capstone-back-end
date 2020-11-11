import { Notification } from "@models";
import { AutoMapper, ProfileBase, mapWith, mapFrom } from '@nartc/automapper';
import { AccountVM, NotificationUM, NotificationVM } from "@view-models";

export class NotificationMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Notification, NotificationVM)
      .forMember(d => d.account, mapWith(AccountVM, s => s.account))
      .forMember(d => d.data, mapFrom(s => s.data))
      .forMember(d => d.notification, mapFrom(s => s.notification));
    mapper.createMap(NotificationUM, NotificationVM);
  }
}