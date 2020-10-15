import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { WFVM } from ".";

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
  public readonly shape: string;

  public readonly props: any;
  // @AutoMap()
  // public readonly wFId: string;
  // // @AutoMap()
  // public readonly wFConnectionVMs: WFConnectionVM[];
  // // @AutoMap()
  // public readonly wFStepInstanceVMs: WFStepInstanceVM[];
  // // @AutoMap()
  // public readonly permissionWFStepVMs: PermissionWFStepVM[];
  // // @AutoMap()
  // public readonly formGroupWFStepVMs: FormGroupWFStepVM[];
  @AutoMap()
  public readonly isDelete: boolean;
  // @AutoMap()
  // public readonly createdBy: string;
  // @AutoMap()
  // public readonly updatedBy: string;
  // @AutoMap()
  // public readonly createdAt: Date;
  // @AutoMap()
  // public readonly updatedAt: Date;
}

export class WFStepCM {
  public id: string;
  @ApiProperty()
  @AutoMap()
  public name: string;
  @ApiProperty()
  @AutoMap()
  public description: string;
  @ApiProperty()
  @AutoMap()
  public type: string;
  @ApiProperty()
  @AutoMap()
  public shape: string;
  @ApiProperty()
  @AutoMap()
  public props: any;
  public wF: WFVM;
}

export class WFStepUM {
  public id: string;
  public name: string;
  public description: string;
  public type: string;
  public shape: string;
  public props: any;
  public wF: WFVM;
}