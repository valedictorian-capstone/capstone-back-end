export class AccountWFStepInstanceVM {
  public readonly Id!: string;
  public readonly AccountId!: string;
  public readonly WFStepInstanceId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class AccountWFStepInstanceCM {
  public readonly AccountId!: string;
  public readonly WFStepInstanceId!: string;
}

export class AccountWFStepInstanceUM {
  public readonly Id!: string;
  public readonly AccountId!: string;
  public readonly WFStepInstanceId!: string;
}