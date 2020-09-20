import { FormGroupWFStepVM } from "./form-group-work-flow-step.view-model";
import { PermissionWFStepVM } from "./permission-work-flow-step.view-model";
import { WFConnectionVM } from "./work-flow-connection.view-model";
import { WFStepInstanceVM } from "./work-flow-step-instance.view-model";

export class WFStepVM {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
  public readonly type!: string;
  public readonly subType!: string;
  public readonly wFId!: string;
  public readonly wFConnectionVMs!: WFConnectionVM[];
  public readonly wFStepInstanceVMs!: WFStepInstanceVM[];
  public readonly permissionWFStepVMs!: PermissionWFStepVM[];
  public readonly formGroupWFStepVMs!: FormGroupWFStepVM[];
  public readonly isDelete!: boolean;
  public readonly createdBy!: string;
  public readonly updatedBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export class WFStepCM {
  public readonly name!: string;
  public readonly description!: string;
  public readonly type!: string;
  public readonly subType!: string;
  public readonly wFId!: string;
}

export class WFStepUM {
  public readonly id!: string;
  public readonly name!: string;
  public readonly description!: string;
  public readonly type!: string;
  public readonly subType!: string;
  public readonly wFId!: string;
}