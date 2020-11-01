import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { ProcessConnectionCM, ProcessConnectionUM, ProcessConnectionVM, ProcessStepCM, ProcessStepUM, ProcessStepVM } from ".";

export class ProcessVM {
  @AutoMap()
  public readonly id!: string;
  @AutoMap()
  public readonly name!: string;
  @AutoMap()
  public readonly description!: string;
  // @AutoMap()
  public readonly props: any;
  @AutoMap()
  public readonly code: string;

  // public readonly processConditions!: ProcessConditionVM[];

  public readonly processSteps!: ProcessStepVM[];

  public readonly processConnections!: ProcessConnectionVM[];

  // public readonly processInstances!: ProcessInstanceVM[];
  // @AutoMap()
  // public readonly isDelete!: boolean;
  // @AutoMap()
  // public readonly createdBy!: string;
  // @AutoMap()
  // public readonly updatedBy!: string;
  // @AutoMap()
  // public readonly createdAt!: Date;
  // @AutoMap()
  // public readonly updatedAt!: Date;
}

export class ProcessCM {
  @ApiProperty()
  public readonly name!: string;
  @ApiProperty()
  public readonly description!: string;
  @ApiProperty()
  public readonly code!: string;
}

export class ProcessUM {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
  public readonly code: string;
  public readonly processSteps: (ProcessStepCM | ProcessStepUM)[];
  public readonly processStepIds: string[];
  public readonly processConnections: (ProcessConnectionUM | ProcessConnectionCM)[];
  public readonly processConnectionIds: string[];
  public readonly props: any;
}