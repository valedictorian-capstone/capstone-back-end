export class WFConditionVM {
  public readonly Id!: string;
  public readonly ConditionId!: string;
  public readonly WFId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class WFConditionCM {
  public readonly ConditionId!: string;
  public readonly WFId!: string;
}

export class WFConditionUM {
  public readonly Id!: string;
  public readonly ConditionId!: string;
  public readonly WFId!: string;
}