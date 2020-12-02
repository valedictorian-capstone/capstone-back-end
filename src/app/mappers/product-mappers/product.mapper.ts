import { Product } from "@models";
import { AutoMapper, mapFrom, mapWith, preCondition, ProfileBase } from '@nartc/automapper';
import { CategoryVM, CommentVM, DealDetailVM, ProductUM, ProductVM } from "@view-models";

export class ProductMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Product, ProductVM)
      .forMember(d => d.parameters, mapFrom(s => s.parameters))
      .forMember(d => d.dealDetails,
        preCondition(s => s.dealDetails != null),
        mapWith(DealDetailVM, s => s.dealDetails)
      )
      .forMember(d => d.category,
        preCondition(s => s.category != null),
        mapWith(CategoryVM, s => s.category)
      ).forMember(d => d.comments,
        preCondition(s => s.comments != null, []),
        mapWith(CommentVM, s => s.comments)
      );
    mapper.createMap(ProductUM, ProductVM);
  }
}