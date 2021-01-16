import { Campaign } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { ActivityVM, AttachmentVM, CampaignUM, CampaignVM, DealVM, CampaignGroupVM, LogVM, NoteVM, PipelineVM} from "@view-models";

export class CampaignMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Campaign, CampaignVM)
      .forMember(d => d.campaignGroups,
        preCondition((s) => s.campaignGroups != null, []),
        mapWith(CampaignGroupVM, s => s.campaignGroups)
      )
      .forMember(d => d.logs,
        preCondition((s) => s.logs != null, []),
        mapWith(LogVM, s => s.logs)
      )
      .forMember(d => d.notes,
        preCondition((s) => s.notes != null, []),
        mapWith(NoteVM, s => s.notes)
      )
      .forMember(d => d.attachments,
        preCondition((s) => s.attachments != null, []),
        mapWith(AttachmentVM, s => s.attachments)
      )
      .forMember(d => d.activitys,
        preCondition((s) => s.activitys != null, []),
        mapWith(ActivityVM, s => s.activitys)
      )
      .forMember(d => d.deals,
        preCondition((s) => s.deals != null, []),
        mapWith(DealVM, s => s.deals)
      )
      .forMember(d => d.pipeline,
        preCondition((s) => s.pipeline != null),
        mapWith(PipelineVM, s => s.pipeline)
      );
    mapper.createMap(CampaignUM, CampaignVM);
  }
}