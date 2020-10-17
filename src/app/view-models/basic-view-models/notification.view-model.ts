import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";

export class NotificationVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly title: string;

  @AutoMap()
  public readonly message: string;

  @AutoMap()
  public readonly data: any;

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
  public readonly title: string;
  @ApiProperty()
  public readonly message: string;
  @ApiProperty()
  public readonly account: { id: string };
  @ApiProperty()
  public readonly data: any;
  @ApiProperty()
  public readonly isSeen: boolean;
}


export class NotificationUM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly title: string;
  @ApiProperty()
  public readonly message: string;
  @ApiProperty()
  public readonly account: { id: string };
  @ApiProperty()
  public readonly data: any;
  @ApiProperty()
  public readonly isSeen: boolean;
}