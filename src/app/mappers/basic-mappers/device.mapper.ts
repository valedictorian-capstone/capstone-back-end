import { Device } from "@models";
import { AutoMapper, mapWith, ProfileBase } from '@nartc/automapper';
import { AccountVM, CustomerVM, DeviceUM, DeviceVM } from "@view-models";

export class DeviceMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Device, DeviceVM)
      .forMember(d => d.account, mapWith(AccountVM, s => s.account))
      .forMember(d => d.customer, mapWith(CustomerVM, s => s.customer))
    mapper.createMap(DeviceUM, DeviceVM);
  }
}