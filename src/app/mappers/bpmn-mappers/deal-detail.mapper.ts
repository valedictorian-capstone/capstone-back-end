import { DealDetail } from '@models';
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { DealDetailCM, DealDetailUM, DealDetailVM, ProductVM, DealVM } from "@view-models";

export class DealDetailDetailMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(DealDetail, DealDetailVM)
      .forMember(d => d.product,
        preCondition(s => s.product != null),
        mapWith(ProductVM, s => s.product)
      )
      .forMember(d => d.deal,
        preCondition(s => s.deal != null),
        mapWith(DealVM, s => s.deal)
      );
    mapper.createMap(DealDetailUM, DealDetailVM);
    mapper.createMap(DealDetailCM, DealDetail);
  }
}