import { Customer, ProcessInstance } from '@models';
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { CustomerVM, ProcessInstanceCM, ProcessInstanceUM, ProcessInstanceVM, ProcessVM } from "@view-models";

export class ProcessInstanceMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(ProcessInstance, ProcessInstanceVM)
      .forMember(d => d.process,
        preCondition(s => s.process != null),
        mapWith(ProcessVM, s => s.process)
      )
      .forMember(d => d.customer,
        preCondition(s => s.customer != null),
        mapWith(CustomerVM, s => s.customer)
      );
    mapper.createMap(ProcessInstanceUM, ProcessInstanceVM);
    mapper.createMap(ProcessInstanceCM, ProcessInstance);
  }
}