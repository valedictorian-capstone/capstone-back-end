import { FormGroupWorkFlowStepVM } from "./form-group-work-flow-step.view-model";
import { PermissionWorkFlowStepVM } from "./permission-work-flow-step.view-model";
import { WorkFlowConnectionVM } from "./work-flow-connection.view-model";
import { WorkFlowStepInstanceVM } from "./work-flow-step-instance.view-model";

export class WorkFlowStepVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly WorkFlowId!: string;
  public readonly WorkFlowConnectionVMs!: WorkFlowConnectionVM[];
  public readonly WorkFlowStepInstanceVMs!: WorkFlowStepInstanceVM[];
  public readonly PermissionWorkFlowStepVMs!: PermissionWorkFlowStepVM[];
  public readonly FormGroupWorkFlowStepVMs!: FormGroupWorkFlowStepVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class WorkFlowStepCM {
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly WorkFlowId!: string;
}

export class WorkFlowStepUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly WorkFlowId!: string;
}