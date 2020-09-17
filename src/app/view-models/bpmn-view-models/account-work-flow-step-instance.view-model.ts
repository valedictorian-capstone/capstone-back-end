export class AccountWorkFlowStepInstanceVM {
  public readonly Id!: string;
  public readonly AccountId!: string;
  public readonly WorkFlowStepInstanceId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class AccountWorkFlowStepInstanceCM {
  public readonly AccountId!: string;
  public readonly WorkFlowStepInstanceId!: string;
}

export class AccountWorkFlowStepInstanceUM {
  public readonly Id!: string;
  public readonly AccountId!: string;
  public readonly WorkFlowStepInstanceId!: string;
}