import { Order } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { OrderUM, OrderVM } from "@view-models";

export class OrderMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Order, OrderVM);
        mapper.createMap(OrderUM, OrderVM);
      }
}