export class FormControlPatternVM {
  public readonly Id!: string;
  public readonly FormControlId!: string;
  public readonly PatternId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class FormControlPatternCM {
  public readonly FormControlId!: string;
  public readonly PatternId!: string;
}

export class FormControlPatternUM {
  public readonly Id!: string;
  public readonly FormControlId!: string;
  public readonly PatternId!: string;
}