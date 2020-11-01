import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { ProcessVM } from ".";

export class ProcessStepVM {
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
  // public readonly processId: string;
  // // @AutoMap()
  // public readonly processConnectionVMs: ProcessConnectionVM[];
  // // @AutoMap()
  // public readonly processStepInstanceVMs: ProcessStepInstanceVM[];
  // // @AutoMap()
  // public readonly permissionProcessStepVMs: PermissionProcessStepVM[];
  // // @AutoMap()
  // public readonly formGroupProcessStepVMs: FormGroupProcessStepVM[];
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

export class ProcessStepCM {
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
  public process: ProcessVM;
}

export class ProcessStepUM {
  public id: string;
  public name: string;
  public description: string;
  public type: string;
  public shape: string;
  public props: any;
  public process: ProcessVM;
}