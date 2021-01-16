import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { CampaignGroupVM, CampaignVM } from "../bpmn-view-models";
import { CustomerVM } from "../customer-view-models";
import { EventVM } from "./event.view-model";

export class GroupVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly name: string;
  
  @AutoMap()
  public readonly description: string;

  @AutoMap()
  public readonly condition: string;
  
  public readonly customers: CustomerVM[];

  public readonly events: EventVM[];

  // public readonly campaigns: CampaignVM[];

  public readonly campaignGroups: CampaignGroupVM[];
  
  @AutoMap()
  public readonly isDelete: boolean;
  
  @AutoMap()
  public readonly createdBy: string;
  
  @AutoMap()
  public readonly updatedBy: string;
  
  @AutoMap()
  public readonly createdAt: Date;
  
  @AutoMap()
  public readonly updatedAt: Date;
}

export class GroupCM {

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description: string;
}

export class GroupUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description: string;
}