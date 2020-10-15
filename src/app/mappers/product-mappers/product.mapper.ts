import { Product } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { ProductExtraInformationDataVM, ProductUM, ProductVM } from "@view-models";

export class ProductMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Product, ProductVM)
      .forMember(d => d.productExtraInformationDatas,
        preCondition((s) => s.productExtraInformationDatas != null, []),
        mapWith(ProductExtraInformationDataVM, s => s.productExtraInformationDatas)
      )
    mapper.createMap(ProductUM, ProductVM);
  }
}