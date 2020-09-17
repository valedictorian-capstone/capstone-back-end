import { AccountWorkFlowStepInstanceVM } from "./account-work-flow-step-instance.view-model";
import { CommentVM } from "./comment.view-model";
import { CustomerWorkFlowStepInstanceVM } from "./customer-work-flow--step-instance.view-model";
import { FormDataVM } from "./form-data.view-model";

export class WorkFlowStepInstanceVM {
  public readonly Id!: string;
  public readonly Status!: string;
  public readonly Note!: string;
  public readonly WorkFlowStepId!: string;
  public readonly WorkFlowInstanceId!: string;
  public readonly CommentVMs!: CommentVM[];
  public readonly CustomerWorkFlowStepInstanceVMs!: CustomerWorkFlowStepInstanceVM[];
  public readonly AccountWorkFlowStepInstanceVMs!: AccountWorkFlowStepInstanceVM[];
  public readonly FormDataVMs!: FormDataVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class WorkFlowStepInstanceCM {
  public readonly Status!: string;
  public readonly Note!: string;
  public readonly WorkFlowStepId!: string;
  public readonly WorkFlowInstanceId!: string;
}

export class WorkFlowStepInstanceUM {
  public readonly Id!: string;
  public readonly Status!: string;
  public readonly Note!: string;
  public readonly WorkFlowStepId!: string;
  public readonly WorkFlowInstanceId!: string;
}