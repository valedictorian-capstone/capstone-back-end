import { Note } from '@models';
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { NoteCM, NoteUM, NoteVM, DealVM, CampaignVM } from "@view-models";

export class NoteMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Note, NoteVM)
      .forMember(d => d.deal,
        preCondition(s => s.deal != null),
        mapWith(DealVM, s => s.deal)
      )
      .forMember(d => d.campaign,
        preCondition(s => s.campaign != null),
        mapWith(CampaignVM, s => s.campaign)
      );
    mapper.createMap(NoteUM, NoteVM);
    mapper.createMap(NoteCM, Note);
  }
}