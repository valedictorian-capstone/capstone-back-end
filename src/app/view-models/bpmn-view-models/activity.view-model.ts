import { ApiProperty } from "@nestjs/swagger";
import { AccountVM, ProcessInstanceVM } from "@view-models";
import { AutoMap } from "nestjsx-automapper";


export class ActivityVM {
  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;
  @AutoMap()
  public readonly description: string;

  public readonly assignee: AccountVM;

  public readonly processInstance: ProcessInstanceVM;

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

export class ActivityCM {
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

  public readonly processInstance: ProcessInstanceVM;

  public readonly assignBy: AccountVM;
}

export class ActivityUM {
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

  public readonly processInstance: ProcessInstanceVM;

  public readonly assignBy: AccountVM;
}