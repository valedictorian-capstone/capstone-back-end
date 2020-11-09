import { ApiProperty } from "@nestjs/swagger";
import { AccountVM } from "@view-models";
import { AutoMap } from "nestjsx-automapper";
import { CustomerVM } from "../customer-view-models";
import { ProcessStepInstanceVM } from "./process-step-instance.view-model";


export class TaskVM {
  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;
  @AutoMap()
  public readonly description: string;

  public readonly assignee: AccountVM;

  public readonly processStepInstance: ProcessStepInstanceVM;

  public readonly customer: CustomerVM;

  public readonly assignBy: AccountVM;

  @AutoMap()
  public readonly status: string;

  @AutoMap()
  public readonly deadline: Date;

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

export class TaskCM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly status: string;
  @ApiProperty()
  public readonly description: string;
  @ApiProperty()
  public readonly deadline: Date;

  public readonly assignee: AccountVM;

  public readonly processStepInstance: ProcessStepInstanceVM;

  public readonly customer: CustomerVM;

  public readonly assignBy: AccountVM;
}

export class TaskUM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly status: string;
  @ApiProperty()
  public readonly description: string;
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
  public readonly assignee: AccountVM;

  public readonly processStepInstance: ProcessStepInstanceVM;

  public readonly customer: CustomerVM;

  public readonly assignBy: AccountVM;
}