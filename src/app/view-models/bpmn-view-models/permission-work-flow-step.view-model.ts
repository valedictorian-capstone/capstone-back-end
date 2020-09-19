export class PermissionWFStepVM {
  public readonly Id!: string;
  public readonly PermissionId!: string;
  public readonly WFStepId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class PermissionWFStepCM {
  public readonly PermissionId!: string;
  public readonly WFStepId!: string;
}

export class PermissionWFStepUM {
  public readonly Id!: string;
  public readonly PermissionId!: string;
  public readonly WFStepId!: string;
}