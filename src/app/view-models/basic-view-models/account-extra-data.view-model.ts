import { AccountExtraInformationDataVM } from "./account-extra-information-data.view-model";

export class AccountExtraDataVM {
  public readonly Id!: string;
  public readonly AccountId!: string;
  public readonly AccountExtraInformationDatas!: AccountExtraInformationDataVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class AccountExtraDataCM {
  public readonly AccountId!: string;
}

export class AccountExtraDataUM {
  public readonly Id!: string;
  public readonly AccountId!: string;
}