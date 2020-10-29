import { OrderRequest } from "@models";
import { AutoMapper, mapWith, ProfileBase } from '@nartc/automapper';
import { CustomerVM, OrderRequestUM, OrderRequestVM, ServiceVM } from "@view-models";

export class OrderRequestMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(OrderRequest, OrderRequestVM)
        .forMember(d => d.customer, mapWith(CustomerVM, s => s.customer))
        .forMember(d => d.service, mapWith(ServiceVM, s => s.service));
        mapper.createMap(OrderRequestUM, OrderRequestVM);
      }
}