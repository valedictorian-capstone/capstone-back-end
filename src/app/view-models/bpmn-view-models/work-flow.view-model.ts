import { WFConditionVM } from "./work-flow-condition.view-model";
import { WFInstanceVM } from "./work-flow-instance.view-model";
import { WFStepVM } from "./work-flow-step.view-model";

export class WFVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Code!: string;
  public readonly WFConditionVMs!: WFConditionVM[];
  public readonly WFStepVMs!: WFStepVM[];
  public readonly WFInstanceVMs!: WFInstanceVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;

  constructor(props: Partial<WFVM>) {
    Object.assign(this, props);
  }
}

export class WFCM {
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Code!: string;
}

export class WFUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Code!: string;
}