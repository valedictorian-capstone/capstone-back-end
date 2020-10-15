import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { WFConnectionCM, WFConnectionUM, WFConnectionVM, WFStepCM, WFStepUM, WFStepVM } from ".";

export class WFVM {
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

  // public readonly wFConditions!: WFConditionVM[];

  public readonly workFlowSteps!: WFStepVM[];

  public readonly workFlowConnections!: WFConnectionVM[];

  // public readonly wFInstances!: WFInstanceVM[];
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

export class WFCM {
  @ApiProperty()
  public readonly name!: string;
  @ApiProperty()
  public readonly description!: string;
  @ApiProperty()
  public readonly code!: string;
}

export class WFUM {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
  public readonly code: string;
  public readonly workFlowSteps: (WFStepCM | WFStepUM)[];
  public readonly workFlowStepIds: string[];
  public readonly workFlowConnections: (WFConnectionUM | WFConnectionCM)[];
  public readonly workFlowConnectionIds: string[];
  public readonly props: any;
}