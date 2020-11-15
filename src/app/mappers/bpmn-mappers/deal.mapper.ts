import { Deal } from '@models';
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { AccountVM, CustomerVM, DealCM, DealUM, DealVM, StageVM, ActivityVM } from "@view-models";

export class DealMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Deal, DealVM)
      .forMember(d => d.stage,
        preCondition(s => s.stage != null),
        mapWith(StageVM, s => s.stage)
      )
      .forMember(d => d.customer,
        preCondition(s => s.customer != null),
        mapWith(CustomerVM, s => s.customer)
      )
      .forMember(d => d.feedbackAssignee,
        preCondition(s => s.feedbackAssignee != null),
        mapWith(AccountVM, s => s.feedbackAssignee)
      )
      .forMember(d => d.activitys,
        preCondition(s => s.activitys != null),
        mapWith(ActivityVM, s => s.activitys)
      );
    mapper.createMap(DealUM, DealVM);
    mapper.createMap(DealCM, Deal);
  }
}