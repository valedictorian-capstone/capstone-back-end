import { Deal } from '@models';
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { AccountVM, CustomerVM, DealCM, DealUM, DealVM, StageVM, ActivityVM, DealDetailVM, NoteVM, LogVM } from "@view-models";

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
        preCondition(s => s.activitys != null, []),
        mapWith(ActivityVM, s => s.activitys)
      )
      .forMember(d => d.dealDetails,
        preCondition(s => s.dealDetails != null, []),
        mapWith(DealDetailVM, s => s.dealDetails)
      )
      .forMember(d => d.notes,
        preCondition(s => s.notes != null, []),
        mapWith(NoteVM, s => s.notes)
      )
      .forMember(d => d.logs,
        preCondition(s => s.logs != null, []),
        mapWith(LogVM, s => s.logs)
      );
    mapper.createMap(DealUM, DealVM);
    mapper.createMap(DealCM, Deal);
  }
}