import { Task } from "@models";
import { AutoMapper, ProfileBase } from "nestjsx-automapper";
import { TaskVM } from "src/app/view-models/task-view-models/task.view-model";

export class TaskMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Task, TaskVM);
  }
}