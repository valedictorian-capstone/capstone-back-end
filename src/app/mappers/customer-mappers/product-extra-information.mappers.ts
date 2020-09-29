import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { ProductExtraInformation, ProductExtraValue } from "@models";
import { ProductExtraInformationUM, ProductExtraInformationVM, ProductExtraValueVM } from "@view-models";
import { mapFrom } from "nestjsx-automapper";

export class ProductExtraInformationMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProductExtraInformation, ProductExtraInformationVM)
    .forMember(d => d.productExtraValues, mapFrom(s => mapper.mapArray(s.productExtraValues, ProductExtraValueVM, ProductExtraValue)));
    mapper.createMap(ProductExtraInformationUM, ProductExtraInformationVM);
  }
}