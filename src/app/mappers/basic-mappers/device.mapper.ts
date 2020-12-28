import { Device } from "@models";
import { AutoMapper, mapWith, ProfileBase } from '@nartc/automapper';
import { EmployeeVM, CustomerVM, DeviceUM, DeviceVM } from "@view-models";

export class DeviceMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Device, DeviceVM)
      .forMember(d => d.employee, mapWith(EmployeeVM, s => s.employee))
      .forMember(d => d.customer, mapWith(CustomerVM, s => s.customer))
    mapper.createMap(DeviceUM, DeviceVM);
  }
}