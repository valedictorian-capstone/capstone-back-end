import { WFStepInstance } from "@models";
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { AccountVM } from "../basic-view-models";
import { CustomerVM } from "../customer-view-models";

export class TaskVM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly status: string;
  @AutoMap()
  public readonly deadline: Date;
  @AutoMap()
  public readonly createBy: string;
  @AutoMap()
  public readonly isDelete: boolean;
  @AutoMap()
  public readonly createAt: Date;
  @AutoMap()
  public readonly updateAt: Date;
  public readonly customers: CustomerVM[];
  public readonly assignee: AccountVM;
  public readonly wfStepInstance: WFStepInstance;
}

export class TaskCM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly status: string;
  @ApiProperty()
  public readonly deadline: Date;
  @ApiProperty()
  public readonly createBy: string;
  @ApiProperty()
  public readonly isDelete: boolean;
  @ApiProperty()
  public readonly createAt: Date;
  @ApiProperty()
  public readonly updateAt: Date;
  @ApiProperty()
  public readonly customerId: string ;
  @ApiProperty()
  public readonly assigneeId: string;
  @ApiProperty()
  public readonly wfStepInstanceId: string;
}

export class TaskUM {
  public readonly id: string;
  public readonly status: string;
  public readonly deadline: Date;
  public readonly createBy: string;
  public readonly isDelete: boolean;
  public readonly createAt: Date;
  public readonly updateAt: Date;
  public readonly customerId: string ;
  public readonly assigneeId: string;
  public readonly wfStepInstanceId: string;
}