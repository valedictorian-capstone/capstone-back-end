import { Comment } from '@models';
import { AutoMapper, mapWith, ProfileBase } from '@nartc/automapper';
import { AccountVM, CommentUM, CommentVM, WFStepInstanceVM } from '@view-models';

export class CommentMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Comment, CommentVM)
        .forMember(d => d.account, mapWith(AccountVM, s => s.account))
        .forMember(d => d.wfStepInstance, mapWith(WFStepInstanceVM, s => s.wfStepInstance));
        mapper.createMap(CommentUM, CommentVM);
    }
}