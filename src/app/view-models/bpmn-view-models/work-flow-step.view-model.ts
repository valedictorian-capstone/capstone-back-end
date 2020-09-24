import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { FormGroupWFStepVM } from "./form-group-work-flow-step.view-model";
import { PermissionWFStepVM } from "./permission-work-flow-step.view-model";
import { WFConnectionVM } from "./work-flow-connection.view-model";
import { WFStepInstanceVM } from "./work-flow-step-instance.view-model";

export class WFStepVM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly name: string;
  @AutoMap()
  public readonly description: string;
  @AutoMap()
  public readonly type: string;
  @AutoMap()
  public readonly subType: string;
  @AutoMap()
  public readonly wFId: string;
  // @AutoMap()
  public readonly wFConnectionVMs: WFConnectionVM[];
  // @AutoMap()
  public readonly wFStepInstanceVMs: WFStepInstanceVM[];
  // @AutoMap()
  public readonly permissionWFStepVMs: PermissionWFStepVM[];
  // @AutoMap()
  public readonly formGroupWFStepVMs: FormGroupWFStepVM[];
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

export class WFStepCM {
  @ApiProperty()
  @AutoMap()
  readonly name: string;
  @ApiProperty()
  @AutoMap()
  readonly description: string;
  @ApiProperty()
  @AutoMap()
  readonly type: string;
  @ApiProperty()
  @AutoMap()
  readonly subType: string;
  @ApiProperty()
  @AutoMap()
  readonly wFId: string;
}

export class WFStepUM {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly type: string;
  public readonly subType: string;
  public readonly wFId: string;
}