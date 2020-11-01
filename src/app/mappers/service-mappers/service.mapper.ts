import { Service } from "@models";
import { AutoMapper, mapFrom, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { OrderRequestVM, ServiceUM, ServiceVM } from "@view-models";

export class ServiceMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Service, ServiceVM)
    .forMember(d => d.parameters, mapFrom(s => s.parameters)) 
    .forMember(d => d.orderRequests,
      preCondition((s) => s.orderRequests != null, []),
      mapWith(OrderRequestVM, s => s.orderRequests)
    );
    mapper.createMap(ServiceUM, ServiceVM);
  }
}