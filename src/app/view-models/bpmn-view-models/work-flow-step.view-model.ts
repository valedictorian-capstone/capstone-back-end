import { FormGroupWFStepVM } from "./form-group-work-flow-step.view-model";
import { PermissionWFStepVM } from "./permission-work-flow-step.view-model";
import { WFConnectionVM } from "./work-flow-connection.view-model";
import { WFStepInstanceVM } from "./work-flow-step-instance.view-model";

export class WFStepVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly WFId!: string;
  public readonly WFConnectionVMs!: WFConnectionVM[];
  public readonly WFStepInstanceVMs!: WFStepInstanceVM[];
  public readonly PermissionWFStepVMs!: PermissionWFStepVM[];
  public readonly FormGroupWFStepVMs!: FormGroupWFStepVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class WFStepCM {
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly WFId!: string;
}

export class WFStepUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly WFId!: string;
}