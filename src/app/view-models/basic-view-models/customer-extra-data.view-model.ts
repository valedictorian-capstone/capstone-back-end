import { CustomerExtraInformationDataVM } from "./customer-extra-information-data.view-model";

export class CustomerExtraDataVM {
  public readonly Id!: string;
  public readonly CustomerId!: string;
  public readonly CustomerExtraInformationDatas!: CustomerExtraInformationDataVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class CustomerExtraDataCM {
  public readonly CustomerId!: string;
}

export class CustomerExtraDataUM {
  public readonly Id!: string;
  public readonly CustomerId!: string;
}