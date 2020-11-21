import { Note } from '@models';
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { NoteCM, NoteUM, NoteVM, DealVM } from "@view-models";

export class NoteMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Note, NoteVM)
      .forMember(d => d.deal,
        preCondition(s => s.deal != null),
        mapWith(DealVM, s => s.deal)
      );
    mapper.createMap(NoteUM, NoteVM);
    mapper.createMap(NoteCM, Note);
  }
}