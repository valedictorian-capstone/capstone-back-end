export class CustomerExtraInformationDataVM {
  public readonly id: string;
  public readonly customerExtraInformationId: string;
  public readonly customerExtraDataId: string;
  public readonly value: string;
  public readonly isDelete: boolean;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class CustomerExtraInformationDataCM {
  public readonly customerExtraInformationId: string;
  public readonly customerExtraDataId: string;
  public readonly value: string;
}

export class CustomerExtraInformationDataUM {
  public readonly id: string;
  public readonly customerExtraInformationId: string;
  public readonly customerExtraDataId: string;
  public readonly value: string;
}