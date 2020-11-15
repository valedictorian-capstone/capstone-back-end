import { Product } from "@models";
import { AutoMapper, mapFrom, ProfileBase } from '@nartc/automapper';
import { ProductUM, ProductVM } from "@view-models";

export class ProductMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Product, ProductVM)
    .forMember(d => d.parameters, mapFrom(s => s.parameters)) 
    mapper.createMap(ProductUM, ProductVM);
  }
}