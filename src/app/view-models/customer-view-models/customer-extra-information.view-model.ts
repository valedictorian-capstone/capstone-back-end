import { CustomerExtraInformationDataVM } from "./customer-extra-information-data.view-model";
import { CustomerExtraInformationPatternVM } from "./customer-extra-information-pattern.view-model";

export class CustomerExtraInformationVM {
  public readonly id: string;
  public readonly name: string;
  public readonly customerId: string;
  public readonly type: string;
  public readonly subType: string;
  public readonly options: string;
  public readonly placeHolder: string;
  public readonly tooltip: string;
  public readonly customerExtraInformationDatas: CustomerExtraInformationDataVM[];
  public readonly customerExtraInformationPatternVMs: CustomerExtraInformationPatternVM[];
  public readonly isDelete: boolean;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class CustomerExtraInformationCM {
  public readonly name: string;
  public readonly customerId: string;
  public readonly type: string;
  public readonly subType: string;
  public readonly options: string;
  public readonly placeHolder: string;
  public readonly tooltip: string;
}

export class CustomerExtraInformationUM {
  public readonly id: string;
  public readonly name: string;
  public readonly customerId: string;
  public readonly type: string;
  public readonly subType: string;
  public readonly options: string;
  public readonly placeHolder: string;
  public readonly tooltip: string;
}