export class FormGroupWorkFlowStepVM {
  public readonly Id!: string;
  public readonly WorkFlowStepId!: string;
  public readonly FormGroupId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class FormGroupWorkFlowStepCM {
  public readonly WorkFlowStepId!: string;
  public readonly FormGroupId!: string;
}

export class FormGroupWorkFlowStepUM {
  public readonly Id!: string;
  public readonly WorkFlowStepId!: string;
  public readonly FormGroupId!: string;
}