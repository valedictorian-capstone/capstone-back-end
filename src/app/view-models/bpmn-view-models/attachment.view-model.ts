import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { DealVM } from "./deal.view-model";


export class AttachmentVM {
  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly extension: string;

  @AutoMap()
  public readonly size: number;

  @AutoMap()
  public readonly url: string;

  @AutoMap()
  public readonly description: string;

  public readonly deal: DealVM;

  @AutoMap()
  public readonly createdBy: string;

  @AutoMap()
  public readonly updatedBy: string;

  @AutoMap()
  public readonly isDelete: boolean;

  @AutoMap()
  public readonly createdAt: Date;

  @AutoMap()
  public readonly updatedAt: Date;
}

export class AttachmentCM {
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly extension: string;
  @ApiProperty()
  public readonly description: string;
  @ApiProperty()
  public readonly url: string;
  @ApiProperty()
  public readonly size: number;

  public readonly deal: DealVM;
}

export class AttachmentUM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly extension: string;
  @ApiProperty()
  public readonly description: string;
  @ApiProperty()
  public readonly url: string;
  @ApiProperty()
  public readonly size: number;
  public readonly deal: DealVM;
}