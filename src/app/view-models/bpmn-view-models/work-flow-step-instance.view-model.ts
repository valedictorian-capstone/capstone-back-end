import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { AccountVM } from "../account-view-models";
import { CustomerVM } from "../customer-view-models";
import { FormDataVM } from "../form-view-models";

export class WFStepInstanceVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly status: string;

  @AutoMap()
  public readonly note: string;

  @AutoMap()
  public readonly wFStep: string;

  @AutoMap()
  public readonly wFInstance: string;

  public readonly customers: CustomerVM[];

  public readonly accounts: AccountVM[];

  public readonly formDatas: FormDataVM[];

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

export class WFStepInstanceCM {
  @ApiProperty()
  public readonly status: string;
  @ApiProperty()
  public readonly note: string;
  @ApiProperty()
  public readonly wFStepId: string;
  @ApiProperty()
  public readonly wFInstanceId: string;
}

export class WFStepInstanceUM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly status: string;
  @ApiProperty()
  public readonly note: string;
  @ApiProperty()
  public readonly wFStepId: string;
  @ApiProperty()
  public readonly wFInstanceId: string;
}