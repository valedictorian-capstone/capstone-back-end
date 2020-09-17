export class CustomerWorkFlowStepInstanceVM {
  public readonly Id!: string;
  public readonly WorkFlowStepInstanceId!: string;
  public readonly CustomerId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class CustomerWorkFlowStepInstanceCM {
  public readonly WorkFlowStepInstanceId!: string;
  public readonly CustomerId!: string;
}

export class CustomerWorkFlowStepInstanceUM {
  public readonly Id!: string;
  public readonly WorkFlowStepInstanceId!: string;
  public readonly CustomerId!: string;
}