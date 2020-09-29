import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { Product, ProductExtraValue } from "@models";
import { ProductUM, ProductVM } from "@view-models";
import { mapFrom } from "nestjsx-automapper";

export class ProductMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Product, ProductVM)
    .forMember(d => d.productExtraValues, mapFrom(s => mapper.mapArray(s.productExtraValues, ProductExtraValue, ProductExtraValue)))
    mapper.createMap(ProductUM, ProductVM);
  }
}