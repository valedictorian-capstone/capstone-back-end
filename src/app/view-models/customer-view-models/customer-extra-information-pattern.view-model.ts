export class CustomerExtraInformationPatternVM {
  public readonly Id!: string;
  public readonly CustomerExtraInformationId!: string;
  public readonly PatternId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class CustomerExtraInformationPatternCM {
  public readonly CustomerExtraInformationId!: string;
  public readonly PatternId!: string;
}

export class CustomerExtraInformationPatternUM {
  public readonly Id!: string;
  public readonly CustomerExtraInformationId!: string;
  public readonly PatternId!: string;
}