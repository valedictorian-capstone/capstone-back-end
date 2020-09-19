export class CustomerWFStepInstanceVM {
  public readonly Id!: string;
  public readonly WFStepInstanceId!: string;
  public readonly CustomerId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class CustomerWFStepInstanceCM {
  public readonly WFStepInstanceId!: string;
  public readonly CustomerId!: string;
}

export class CustomerWFStepInstanceUM {
  public readonly Id!: string;
  public readonly WFStepInstanceId!: string;
  public readonly CustomerId!: string;
}