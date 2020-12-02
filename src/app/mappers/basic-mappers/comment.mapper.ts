import { Comment } from "@models";
import { CommentUM, CommentVM, CustomerVM, ProductVM } from "@view-models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from '@nartc/automapper';

export class CommentMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Comment, CommentVM)
            .forMember(d => d.customer,
                preCondition((s) => s.customer != null),
                mapWith(CustomerVM, s => s.customer)
            ).forMember(d => d.product,
                preCondition((s) => s.product != null),
                mapWith(ProductVM, s => s.product)
            );
        mapper.createMap(CommentUM, CommentVM);
    }
}