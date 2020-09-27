import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { ProductExtraValue } from "@models";
import { ProductExtraValueUM, ProductExtraValueVM } from "@view-models";

export class ProductExtraValueMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProductExtraValue, ProductExtraValueVM)
      .forMember(d => d.productExtraInformation, mapWith(ProductExtraValueVM, s => s.productExtraInformation))
      .forMember(d => d.product, mapWith(ProductExtraValueVM, s => s.product) )
    mapper.createMap(ProductExtraValueUM, ProductExtraValueVM);
  }
}