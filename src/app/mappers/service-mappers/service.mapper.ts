import { Service } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { ServiceUM, ServiceVM } from "@view-models";

export class ServiceMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Service, ServiceVM);
    mapper.createMap(ServiceUM, ServiceVM);
  }
}