import { Process } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { StageVM, ProcessUM, ProcessVM} from "@view-models";

export class ProcessMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Process, ProcessVM)
      .forMember(d => d.stages,
        preCondition((s) => s.stages != null, []),
        mapWith(StageVM, s => s.stages)
      );
    mapper.createMap(ProcessUM, ProcessVM);
  }
}