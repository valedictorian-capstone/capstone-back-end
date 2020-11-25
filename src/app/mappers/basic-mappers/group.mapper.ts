import { ProfileBase, AutoMapper, mapWith } from "@nartc/automapper";
import { Group } from "@models";
import { GroupUM, GroupVM, CustomerVM } from "@view-models";

export class GroupMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Group, GroupVM)
      .forMember(d => d.customers, mapWith(CustomerVM, s => s.customers))
      .forMember(d => d.events, mapWith(CustomerVM, s => s.events))
    mapper.createMap(GroupUM, GroupVM);
  }
}