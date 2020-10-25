import { Customer } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { CustomerUM, CustomerVM } from "@view-models";

export class CustomerMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Customer, CustomerVM)
    mapper.createMap(CustomerUM, CustomerVM);
  }
}