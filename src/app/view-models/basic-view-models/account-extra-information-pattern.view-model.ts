export class AccountExtraInformationPatternVM {
  public readonly Id!: string;
  public readonly AccountExtraInformationId!: string;
  public readonly PatternId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class AccountExtraInformationPatternCM {
  public readonly AccountExtraInformationId!: string;
  public readonly PatternId!: string;
}

export class AccountExtraInformationPatternUM {
  public readonly Id!: string;
  public readonly AccountExtraInformationId!: string;
  public readonly PatternId!: string;
}