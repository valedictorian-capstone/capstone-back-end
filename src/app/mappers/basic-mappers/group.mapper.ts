import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { Group } from "@models";
import { GroupUM, GroupVM } from "@view-models";

export class GroupMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Group, GroupVM)
      .forMember(d => d.customers, mapWith(GroupVM, s => s.customers))
    mapper.createMap(GroupUM, GroupVM);
  }
}