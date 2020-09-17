export class FormValueVM {
  public readonly Id!: string;
  public readonly FormControlId!: string;
  public readonly FormDataId!: string;
  public readonly Value!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class FormValueCM {
  public readonly FormControlId!: string;
  public readonly FormDataId!: string;
  public readonly Value!: string;
}

export class FormValueUM {
  public readonly Id!: string;
  public readonly FormControlId!: string;
  public readonly FormDataId!: string;
  public readonly Value!: string;
}