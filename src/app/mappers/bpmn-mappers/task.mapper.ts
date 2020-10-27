import { Task } from "@models";
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { AccountVM, CustomerVM, TaskUM, TaskVM, WFStepInstanceVM } from "@view-models";

export class TaskMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Task, TaskVM)
      .forMember(
        d => d.customer,
        mapWith(CustomerVM, s => s.customer)
      )
      .forMember(
        d => d.assignee,
        mapWith(AccountVM, s => s.assignee)
      )
      .forMember(
        d => d.assignBy,
        mapWith(AccountVM, s => s.assignBy)
      ).forMember(
        d => d.wfStepInstance,
        mapWith(WFStepInstanceVM, s => s.wfStepInstance)
      )
      ;
    mapper.createMap(TaskUM, TaskVM);
  }
}