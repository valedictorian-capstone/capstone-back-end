import { Attachment } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { AttachmentUM, AttachmentVM, CampaignVM, DealVM } from "@view-models";

export class AttachmentMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Attachment, AttachmentVM)
      .forMember(
        d => d.deal,
        mapWith(DealVM, s => s.deal)
      )
      .forMember(d => d.campaign,
        preCondition(s => s.campaign != null),
        mapWith(CampaignVM, s => s.campaign)
      );
    mapper.createMap(AttachmentUM, AttachmentVM);
  }
}