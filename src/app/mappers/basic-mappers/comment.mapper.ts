import { Comment } from '@models';
import { AutoMapper, mapWith, ProfileBase } from '@nartc/automapper';
import { AccountVM, CommentUM, CommentVM, ProcessStepInstanceVM } from '@view-models';

export class CommentMapper extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(Comment, CommentVM)
        .forMember(d => d.account, mapWith(AccountVM, s => s.account))
        .forMember(d => d.processStepInstance, mapWith(ProcessStepInstanceVM, s => s.processStepInstance));
        mapper.createMap(CommentUM, CommentVM);
    }
}