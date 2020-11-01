import { Department } from "@models";
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { ProcessVM } from ".";
import { DepartmentVM } from "../basic-view-models";
import { FormGroupVM } from "../form-view-models";
import { ProcessConnectionVM } from "./process-connection.view-model";
import { ProcessStepInstanceVM } from "./process-step-instance.view-model";

export class ProcessStepVM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly name: string;
  @AutoMap()
  public readonly description: string;
  @AutoMap()
  public readonly type: string;

  public process: ProcessVM;

  public processStepInstances: ProcessStepInstanceVM[];

  public processFromConnections: ProcessConnectionVM[];

  public processToConnections: ProcessConnectionVM[];

  public department: DepartmentVM;

  public formGroups: FormGroupVM[];

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

export class ProcessStepCM {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public type: string;
  @ApiProperty()
  public processFromConnections: ProcessConnectionVM[];
  @ApiProperty()
  public processToConnections: ProcessConnectionVM[];
  @ApiProperty()
  public department: DepartmentVM;
}

export class ProcessStepUM {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public description: string;
  @ApiProperty()
  public type: string;
  @ApiProperty()
  public process: ProcessVM;
  @ApiProperty()
  public processFromConnections: ProcessConnectionVM[];
  @ApiProperty()
  public processToConnections: ProcessConnectionVM[];
  @ApiProperty()
  public department: Department;
}