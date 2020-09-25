export class FormGroupWFStepVM {
  public readonly Id!: string;
  public readonly WFStepId!: string;
  public readonly FormGroupId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class FormGroupWFStepCM {
  public readonly WFStepId!: string;
  public readonly FormGroupId!: string;
}

export class FormGroupWFStepUM {
  public readonly Id!: string;
  public readonly WFStepId!: string;
  public readonly FormGroupId!: string;
}