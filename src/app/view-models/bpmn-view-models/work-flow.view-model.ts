import { WorkFlowConditionVM } from "./work-flow-condition.view-model";
import { WorkFlowInstanceVM } from "./work-flow-instance.view-model";
import { WorkFlowStepVM } from "./work-flow-step.view-model";

export class WorkFlowVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Code!: string;
  public readonly WorkFlowConditionVMs!: WorkFlowConditionVM[];
  public readonly WorkFlowStepVMs!: WorkFlowStepVM[];
  public readonly WorkFlowInstanceVMs!: WorkFlowInstanceVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;

  constructor(props: Partial<WorkFlowVM>) {
    Object.assign(this, props);
  }
}

export class WorkFlowCM {
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Code!: string;
}

export class WorkFlowUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Code!: string;
}