import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { DeviceVM, GroupVM, NotificationVM } from "../basic-view-models";
import { DealVM } from "../bpmn-view-models";
import { TicketVM } from "../product-view-models";

export class CustomerVM {

  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly phone: string;
  
  @AutoMap()
  public readonly email: string;
  
  @AutoMap()
  public readonly fullname: string;
  
  @AutoMap()
  public readonly birthDay: Date;
  
  @AutoMap()
  public readonly avatar: string;
  
  @AutoMap()
  public readonly source: string;
  
  @AutoMap()
  public readonly type: string;
  
  @AutoMap()
  public readonly industry: string;
  
  @AutoMap()
  public readonly frequency: number;
  
  @AutoMap()
  public readonly totalSpending: number;
  
  @AutoMap()
  public readonly totalDeal: number;
  
  @AutoMap()
  public readonly gender: string;
  
  @AutoMap()
  public readonly company: string;
  
  @AutoMap()
  public readonly fax: string;
  
  @AutoMap()
  public readonly website: string;
  
  @AutoMap()
  public readonly stage: string;
  
  @AutoMap()
  public readonly skypeName: string;
  
  @AutoMap()
  public readonly facebook: string;
  
  @AutoMap()
  public readonly twitter: string;
  
  @AutoMap()
  public readonly street: string;
  
  @AutoMap()
  public readonly city: string;
  
  @AutoMap()
  public readonly state: string;
  
  @AutoMap()
  public readonly country: string;
  
  @AutoMap()
  public readonly description: string;

  public readonly groups: GroupVM[];

  public readonly deals: DealVM[];

  public readonly tickets: TicketVM[];
  
  public readonly notifications: NotificationVM[];
  
  public readonly devices: DeviceVM[];

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

export class CustomerCM {

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public phone: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public email: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public fullname: string;
  
  @ApiProperty({ required: true, format: 'Date' })
  public birthDay: Date;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public avatar: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public source: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public type: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public industry: string;
  
  @ApiProperty({ required: true, format: 'number' })
  public totalSpending: number;

  @ApiProperty({ required: true, format: 'number' })
  public frequency: number;
  
  @ApiProperty({ required: true, format: 'number' })
  public totalDeal: number;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public gender: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public company: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public fax: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public website: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public stage: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public skypeName: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public facebook: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public twitter: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public street: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public city: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public state: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public country: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public description: string;
}

export class CustomerUM {

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public phone: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public email: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public fullname: string;
  
  @ApiProperty({ required: true, format: 'Date' })
  public birthDay: Date;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public avatar: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public source: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public type: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public industry: string;
  
  @ApiProperty({ required: true, format: 'number' })
  public totalSpending: number;

  @ApiProperty({ required: true, format: 'number' })
  public frequency: number;
  
  @ApiProperty({ required: true, format: 'number' })
  public totalDeal: number;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public gender: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public company: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public fax: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public website: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public stage: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public skypeName: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public facebook: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public twitter: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public street: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public city: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public state: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public country: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public description: string;

}