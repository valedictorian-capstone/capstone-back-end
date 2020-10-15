import { ProductExtraInformationData } from "@models";
import { AutoMapper, mapWith, ProfileBase } from "@nartc/automapper";
import { ExtraInformationVM, ProductExtraInformationDataUM, ProductExtraInformationDataVM, ProductVM } from "@view-models";

export class ProductExtraInformationDataMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProductExtraInformationData, ProductExtraInformationDataVM)
    .forMember(d => d.product, mapWith(ProductVM, s => s.product))
    .forMember(d => d.extraInformation, mapWith(ExtraInformationVM, s => s.extraInformation));
    mapper.createMap(ProductExtraInformationDataUM, ProductExtraInformationDataVM);
  }
}