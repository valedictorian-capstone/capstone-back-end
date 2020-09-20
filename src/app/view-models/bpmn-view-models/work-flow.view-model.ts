import { WFConditionVM } from "./work-flow-condition.view-model";
import { WFInstanceVM } from "./work-flow-instance.view-model";
import { WFStepVM } from "./work-flow-step.view-model";

export class WFVM {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
  public readonly code!: string;
  public readonly wFConditionVMs!: WFConditionVM[];
  public readonly wFStepVMs!: WFStepVM[];
  public readonly wFInstanceVMs!: WFInstanceVM[];
  public readonly isDelete!: boolean;
  public readonly createdBy!: string;
  public readonly updatedBy!: string;
  public readonly createdAt!: Date;
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