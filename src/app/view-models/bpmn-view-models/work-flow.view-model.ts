import { AutoMap } from "nestjsx-automapper";
import { WFConditionVM } from "./work-flow-condition.view-model";
import { WFInstanceVM } from "./work-flow-instance.view-model";
import { WFStepVM } from "./work-flow-step.view-model";

export class WFVM {
  @AutoMap()
  public readonly id!: string;
  @AutoMap()
  public readonly name!: string;
  @AutoMap()
  public readonly description!: string;
  @AutoMap()
  public readonly code!: string;
  // public readonly wFConditionVMs!: WFConditionVM[];
  public readonly wFStepVMs!: WFStepVM[];
  // public readonly wFInstanceVMs!: WFInstanceVM[];
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

  constructor(props: Partial<WFVM>) {
    Object.assign(this, props);
  }
}

export class WFCM {
  public readonly name!: string;
  public readonly description!: string;
  public readonly code!: string;
}

export class WFUM {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
}