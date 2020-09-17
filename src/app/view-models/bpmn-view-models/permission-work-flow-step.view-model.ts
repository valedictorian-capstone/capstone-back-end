export class PermissionWorkFlowStepVM {
  public readonly Id!: string;
  public readonly PermissionId!: string;
  public readonly WorkFlowStepId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class PermissionWorkFlowStepCM {
  public readonly PermissionId!: string;
  public readonly WorkFlowStepId!: string;
}

export class PermissionWorkFlowStepUM {
  public readonly Id!: string;
  public readonly PermissionId!: string;
  public readonly WorkFlowStepId!: string;
}