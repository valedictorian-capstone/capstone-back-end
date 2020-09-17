import { CustomerExtraInformationDataVM } from "./customer-extra-information-data.view-model";
import { CustomerExtraInformationPatternVM } from "./customer-extra-information-pattern.view-model";

export class CustomerExtraInformationVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly CustomerId!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly Options!: string;
  public readonly PlaceHolder!: string;
  public readonly Tooltip!: string;
  public readonly CustomerExtraInformationDatas!: CustomerExtraInformationDataVM[];
  public readonly CustomerExtraInformationPatternVMs!: CustomerExtraInformationPatternVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class CustomerExtraInformationCM {
  public readonly Name!: string;
  public readonly CustomerId!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly Options!: string;
  public readonly PlaceHolder!: string;
  public readonly Tooltip!: string;
}

export class CustomerExtraInformationUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly CustomerId!: string;
  public readonly Type!: string;
  public readonly SubType!: string;
  public readonly Options!: string;
  public readonly PlaceHolder!: string;
  public readonly Tooltip!: string;
}