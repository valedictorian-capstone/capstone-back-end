import { Stage } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import {  DealVM, StageUM, StageVM, ProcessVM} from "@view-models";

export class StageMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Stage, StageVM)
      .forMember(d => d.deals,
        preCondition((s) => s.deals != null, []),
        mapWith(DealVM, s => s.deals)
      )
      .forMember(d => d.process,
        preCondition((s) => s.process != null, []),
        mapWith(ProcessVM, s => s.process)
      );
    mapper.createMap(StageUM, StageVM);
  }
}