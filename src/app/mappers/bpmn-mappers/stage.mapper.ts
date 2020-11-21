import { Stage } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { DealVM, StageUM, StageVM, PipelineVM, StageCM} from "@view-models";

export class StageMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Stage, StageVM)
      .forMember(d => d.deals,
        preCondition((s) => s.deals != null),
        mapWith(DealVM, s => s.deals)
      )
      .forMember(d => d.pipeline,
        preCondition((s) => s.pipeline != null),
        mapWith(PipelineVM, s => s.pipeline)
      );
    mapper.createMap(StageUM, StageVM);
    mapper.createMap(StageCM, Stage);
  }
}