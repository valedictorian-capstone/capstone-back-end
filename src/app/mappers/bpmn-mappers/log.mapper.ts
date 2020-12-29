import { Log } from '@models';
import { AutoMapper, mapWith, preCondition, ProfileBase } from "@nartc/automapper";
import { LogCM, LogUM, LogVM, DealVM, CampaignVM } from "@view-models";

export class LogMapper extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Log, LogVM)
      .forMember(d => d.deal,
        preCondition(s => s.deal != null),
        mapWith(DealVM, s => s.deal)
      )
      .forMember(d => d.campaign,
        preCondition(s => s.campaign != null),
        mapWith(CampaignVM, s => s.campaign)
      );
    mapper.createMap(LogUM, LogVM);
    mapper.createMap(LogCM, Log);
  }
}