import { Category } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { ProductVM, CategoryUM, CategoryVM} from "@view-models";

export class CategoryMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Category, CategoryVM)
      .forMember(d => d.products,
        preCondition((s) => s.products != null, []),
        mapWith(ProductVM, s => s.products)
      );
    mapper.createMap(CategoryUM, CategoryVM);
  }
}