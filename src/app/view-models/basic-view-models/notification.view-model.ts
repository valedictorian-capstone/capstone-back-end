import { ApiProperty } from "@nestjs/swagger";
import { AccountVM } from "@view-models";
import { AutoMap } from "nestjsx-automapper";

export class NotificationVM {

  @AutoMap()
  public readonly id: string;
  public readonly notification: any;
  public readonly data: any;
  public readonly account: AccountVM;
  @AutoMap()
  public readonly type: string;

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
  public readonly notification: any;
  @ApiProperty()
  public readonly type: string;
  public readonly account: AccountVM;
  @ApiProperty()
  public readonly data: any;
  @ApiProperty()
  public readonly isSeen: boolean;
}


export class NotificationUM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly notification: any;
  @ApiProperty()
  public readonly type: string;
  public readonly account: AccountVM;
  @ApiProperty()
  public readonly data: any;
  @ApiProperty()
  public readonly isSeen: boolean;
}