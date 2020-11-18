import { Pipeline } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { StageVM, PipelineUM, PipelineVM} from "@view-models";

export class PipelineMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Pipeline, PipelineVM)
      .forMember(d => d.stages,
        preCondition((s) => s.stages != null, []),
        mapWith(StageVM, s => s.stages)
      );
    mapper.createMap(PipelineUM, PipelineVM);
  }
}