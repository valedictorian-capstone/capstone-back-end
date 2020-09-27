import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { Product } from "@models";
import { ProductUM, ProductVM } from "@view-models";

export class ProductMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Product, ProductVM)
      .forMember(d => d.productExtraValues, mapWith(ProductVM, s => s.productExtraValues))
    mapper.createMap(ProductUM, ProductVM);
  }
}