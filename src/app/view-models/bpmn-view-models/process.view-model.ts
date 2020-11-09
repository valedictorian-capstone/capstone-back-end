import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { ProcessInstanceVM, ProcessStepVM } from ".";

export class ProcessVM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly name: string;
  @AutoMap()
  public readonly description: string;
  @AutoMap()
  public readonly code: string;

  // public readonly processConditions: ProcessConditionVM[];

  public readonly processSteps: ProcessStepVM[];

  public readonly processInstances: ProcessInstanceVM[];
  // @AutoMap()
  // public readonly isDelete: boolean;
  // @AutoMap()
  // public readonly createdBy: string;
  // @AutoMap()
  // public readonly updatedBy: string;
  // @AutoMap()
  // public readonly createdAt: Date;
  // @AutoMap()
  // public readonly updatedAt: Date;
}

export class ProcessCM {
  @ApiProperty()
  public readonly name: string;
  @ApiProperty()
  public readonly description: string;
  @ApiProperty()
  public readonly code: string;
}

export class ProcessUM {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly code: string;
}