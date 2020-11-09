import { ProcessStepInstance } from "@models";
import { AutoMapper, ProfileBase } from "@nartc/automapper";
import { CommentVM, FormDataVM, ProcessInstanceVM, ProcessStepInstanceVM, ProcessStepVM, TaskVM } from "@view-models";
import { mapWith, preCondition } from "nestjsx-automapper";

export class ProcessStepInstanceMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProcessStepInstance, ProcessStepInstanceVM)
      .forMember(d => d.processInstance,
        preCondition((s) => s.processInstance != null),
        mapWith(ProcessInstanceVM, s => s.processInstance)
      )
      .forMember(d => d.tasks,
        preCondition((s) => s.tasks != null, []),
        mapWith(TaskVM, s => s.tasks)
      )
      .forMember(d => d.comments,
        preCondition((s) => s.comments != null, []),
        mapWith(CommentVM, s => s.comments)
      )
      .forMember(d => d.formDatas,
        preCondition((s) => s.formDatas != null, []),
        mapWith(FormDataVM, s => s.formDatas)
      )
      .forMember(d => d.processStep,
        preCondition((s) => s.processStep != null),
        mapWith(ProcessStepVM, s => s.processStep)
      );
    // mapper.createMap(ProcessStepUM, ProcessStepVM);
  }
}