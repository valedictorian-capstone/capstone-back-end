export class CustomerExtraInformationDataVM {
  public readonly Id!: string;
  public readonly CustomerExtraInformationId!: string;
  public readonly CustomerExtraDataId!: string;
  public readonly Value!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class CustomerExtraInformationDataCM {
  public readonly CustomerExtraInformationId!: string;
  public readonly CustomerExtraDataId!: string;
  public readonly Value!: string;
}

export class CustomerExtraInformationDataUM {
  public readonly Id!: string;
  public readonly CustomerExtraInformationId!: string;
  public readonly CustomerExtraDataId!: string;
  public readonly Value!: string;
}