import { Comment } from "@models";
import { CommentUM, CommentVM, CustomerCM, ProductCM } from "@view-models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "nestjsx-automapper";

export class CommentMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Comment, CommentVM)
            .forMember(d => d.customer,
                preCondition((s) => s.customer != null),
                mapWith(CustomerCM, s => s.customer)
            ).forMember(d => d.product,
                preCondition((s) => s.product != null),
                mapWith(ProductCM, s => s.product)
            );
        mapper.createMap(CommentUM, CommentVM);
    }
}