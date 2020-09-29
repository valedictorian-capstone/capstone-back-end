import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { Product, ProductExtraInformation, ProductExtraValue } from "@models";
import { ProductExtraInformationVM, ProductExtraValueUM, ProductExtraValueVM, ProductVM } from "@view-models";
import { mapFrom } from "nestjsx-automapper";

export class ProductExtraValueMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProductExtraValue, ProductExtraValueVM)
    .forMember(d => d.productExtraInformation, mapFrom(s => mapper.map(s.productExtraInformation, ProductExtraInformationVM, ProductExtraInformation)))
    .forMember(d => d.product, mapFrom(s => mapper.map(s.product, ProductVM, Product)));
    mapper.createMap(ProductExtraValueUM, ProductExtraValueVM);
  }
}