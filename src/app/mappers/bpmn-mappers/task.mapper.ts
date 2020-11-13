import { Task } from "@models";
import { AutoMapper, mapWith, ProfileBase } from "@nartc/automapper";
import { AccountVM, CustomerVM, TaskUM, TaskVM } from "@view-models";

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
      );
    mapper.createMap(TaskUM, TaskVM);
  }
}