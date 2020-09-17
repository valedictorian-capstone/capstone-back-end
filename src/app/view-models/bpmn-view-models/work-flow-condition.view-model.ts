export class WorkFlowConditionVM {
  public readonly Id!: string;
  public readonly ConditionId!: string;
  public readonly WorkFlowId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class WorkFlowConditionCM {
  public readonly ConditionId!: string;
  public readonly WorkFlowId!: string;
}

export class WorkFlowConditionUM {
  public readonly Id!: string;
  public readonly ConditionId!: string;
  public readonly WorkFlowId!: string;
}