import { Product } from "@models";
import { AutoMapper, mapFrom, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { DealDetailVM, ProductUM, ProductVM } from "@view-models";

export class ProductMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Product, ProductVM)
      .forMember(d => d.parameters, mapFrom(s => s.parameters))
      .forMember(d => d.dealDetails,
        preCondition(s => s.dealDetails != null),
        mapWith(DealDetailVM, s => s.dealDetails)
      )
    mapper.createMap(ProductUM, ProductVM);
  }
}