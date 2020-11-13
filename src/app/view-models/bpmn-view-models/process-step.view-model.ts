import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { ProcessVM } from ".";
import { ProcessConnectionVM } from "./process-connection.view-model";

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
  public readonly subType: string;

  public process: ProcessVM;

  public processFromConnections: ProcessConnectionVM[];

  public processToConnections: ProcessConnectionVM[];

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
  @AutoMap()
  public readonly subType: string;
  @ApiProperty()
  public processFromConnections: ProcessConnectionVM[];
  @ApiProperty()
  public processToConnections: ProcessConnectionVM[];
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
  @AutoMap()
  public readonly subType: string;
  public process: ProcessVM;
  @ApiProperty()
  public processFromConnections: ProcessConnectionVM[];
  @ApiProperty()
  public processToConnections: ProcessConnectionVM[];
}