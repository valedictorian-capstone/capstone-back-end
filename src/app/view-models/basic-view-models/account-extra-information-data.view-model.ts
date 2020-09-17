export class AccountExtraInformationDataVM {
  public readonly Id!: string;
  public readonly AccountExtraInformationId!: string;
  public readonly AccountExtraDataId!: string;
  public readonly Value!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class AccountExtraInformationDataCM {
  public readonly AccountExtraInformationId!: string;
  public readonly AccountExtraDataId!: string;
  public readonly Value!: string;
}

export class AccountExtraInformationDataUM {
  public readonly Id!: string;
  public readonly AccountExtraInformationId!: string;
  public readonly AccountExtraDataId!: string;
  public readonly Value!: string;
}