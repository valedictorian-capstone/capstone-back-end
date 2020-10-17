import { Notification } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { NotificationUM, NotificationVM } from "@view-models";

export class NotificationMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Notification, NotificationVM);
    mapper.createMap(NotificationUM, NotificationVM);
  }
}