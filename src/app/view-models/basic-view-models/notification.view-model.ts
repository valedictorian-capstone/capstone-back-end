import { ApiProperty } from "@nestjs/swagger";
import { AccountVM, CustomerVM } from "@view-models";
import { AutoMap } from "nestjsx-automapper";

export class NotificationVM {

  @AutoMap()
  public readonly id: string;
  public readonly data: any;
  public readonly account: AccountVM;
  @AutoMap()
  public readonly type: string;
  @AutoMap()
  public readonly body: string;
  @AutoMap()
  public readonly icon: string;
  @AutoMap()
  public readonly title: string;
  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly isSeen: boolean;

  @AutoMap()
  public readonly createdBy: string;

  @AutoMap()
  public readonly updatedBy: string;
  
  @AutoMap()
  public readonly createdAt: Date;
  @AutoMap()
  public readonly updatedAt: Date;
}

export class NotificationCM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly type: string;
  @ApiProperty()
  public readonly body: string;
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly icon: string;
  @ApiProperty()
  public readonly name: string;
  public readonly customer: CustomerVM;
  public readonly account: AccountVM;
  public readonly data: any;
  @ApiProperty()
  public readonly isSeen: boolean;
}


export class NotificationUM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly type: string;
  @ApiProperty()
  public readonly body: string;
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly icon: string;
  @ApiProperty()
  public readonly name: string;
  public readonly customer: CustomerVM;
  public readonly account: AccountVM;
  public readonly data: any;
  @ApiProperty()
  public readonly isSeen: boolean;
}