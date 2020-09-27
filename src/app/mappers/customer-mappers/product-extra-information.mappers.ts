import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { ProductExtraInformation } from "@models";
import { ProductExtraInformationUM, ProductExtraInformationVM } from "@view-models";

export class ProductExtraInformationMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProductExtraInformation, ProductExtraInformationVM)
      .forMember(d => d.productExtraValues, mapWith(ProductExtraInformationVM, s => s.productExtraValues));
    mapper.createMap(ProductExtraInformationUM, ProductExtraInformationVM);
  }
}