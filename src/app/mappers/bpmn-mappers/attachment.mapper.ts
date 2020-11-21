import { Attachment } from "@models";
import { AutoMapper, mapWith, ProfileBase } from "@nartc/automapper";
import { AttachmentUM, AttachmentVM, DealVM } from "@view-models";

export class AttachmentMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Attachment, AttachmentVM)
      .forMember(
        d => d.deal,
        mapWith(DealVM, s => s.deal)
      );
    mapper.createMap(AttachmentUM, AttachmentVM);
  }
}