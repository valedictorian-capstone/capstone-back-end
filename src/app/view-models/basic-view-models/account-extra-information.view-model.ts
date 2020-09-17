import { AccountExtraInformationDataVM } from "./account-extra-information-data.view-model";
import { AccountExtraInformationPatternVM } from "./account-extra-information-pattern.view-model";

export class AccountExtraInformationVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly AccountId!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly Options!: string;
  public readonly PlaceHolder!: string;
  public readonly Tooltip!: string;
  public readonly AccountExtraInformationDatas!: AccountExtraInformationDataVM[];
  public readonly AccountExtraInformationPatternVMs!: AccountExtraInformationPatternVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class AccountExtraInformationCM {
  public readonly Name!: string;
  public readonly AccountId!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly Options!: string;
  public readonly PlaceHolder!: string;
  public readonly Tooltip!: string;
}

export class AccountExtraInformationUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly AccountId!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly Options!: string;
  public readonly PlaceHolder!: string;
  public readonly Tooltip!: string;
}