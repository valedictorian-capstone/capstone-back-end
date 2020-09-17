import { WorkFlowStepInstanceVM } from "./work-flow-step-instance.view-model";

export class WorkFlowInstanceVM {
  public readonly Id!: string;
  public readonly Code!: string;
  public readonly WorkFlowId!: string;
  public readonly Note!: string;
  public readonly WorkFlowStepInstanceVMs!: WorkFlowStepInstanceVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;

  constructor(props: Partial<WorkFlowInstanceVM>) {
    Object.assign(this, props);
  }
}

export class WorkFlowInstanceCM {
  public readonly Code!: string;
  public readonly WorkFlowId!: string;
  public readonly Note!: string;
}

export class WorkFlowInstanceUM {
  public readonly Id!: string;
  public readonly Code!: string;
  public readonly WorkFlowId!: string;
  public readonly Note!: string;
}