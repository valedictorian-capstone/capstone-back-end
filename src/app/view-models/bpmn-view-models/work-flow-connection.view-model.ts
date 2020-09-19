export class WFConnectionVM {
  public readonly Id!: string;
  public readonly Type!: string;
  public readonly Description!: string;
  public readonly FromWFStepId!: string;
  public readonly ToWFStepId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;

  constructor(props: Partial<WFConnectionVM>) {
    Object.assign(this, props);
  }
}

export class WFConnectionCM {
  public readonly Type!: string;
  public readonly Description!: string;
  public readonly FromWFStepId!: string;
  public readonly ToWFStepId!: string;
}

export class WFConnectionUM {
  public readonly Id!: string;
  public readonly Type!: string;
  public readonly Description!: string;
  public readonly FromWFStepId!: string;
  public readonly ToWFStepId!: string;
}