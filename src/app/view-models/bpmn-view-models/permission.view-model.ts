import { PermissionWFStepVM } from "./permission-work-flow-step.view-model";
import { RolePermissionVM } from "./role-permission.view-model";

export class PermissionVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly PermissionWFStepVMs!: PermissionWFStepVM[];
  public readonly RolePermissionVMs!: RolePermissionVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class PermissionCM {
  public readonly Name!: string;
  public readonly Description!: string;
}

export class PermissionUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
}