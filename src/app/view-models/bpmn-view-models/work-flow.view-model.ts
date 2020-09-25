import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { WFConditionVM } from "./work-flow-condition.view-model";
import { WFInstanceVM } from "./work-flow-instance.view-model";
import { WFStepCM, WFStepVM } from "./work-flow-step.view-model";

export class WFVM {
  @AutoMap()
  public readonly id!: string;
  @AutoMap()
  public readonly name!: string;
  @AutoMap()
  public readonly description!: string;
  // @AutoMap()
  public readonly style: any;
  @AutoMap()
  public readonly code!: string;
  public readonly wFConditions!: WFConditionVM[];
  public readonly wFSteps!:WFStepVM[];
  public readonly wFInstances!: WFInstanceVM[];
  @AutoMap()
  public readonly isDelete!: boolean;
  @AutoMap()
  public readonly createdBy!: string;
  @AutoMap()
  public readonly updatedBy!: string;
  @AutoMap()
  public readonly createdAt!: Date;
  @AutoMap()
  public readonly updatedAt!: Date;
}

export class WFCM {
  @ApiProperty()
  public readonly name!: string;
  @ApiProperty()
  public readonly description!: string;
  @ApiProperty()
  public readonly code!: string;
  // @ApiProperty()
  public readonly wFSteps: any[]
}

export class WFUM {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
}