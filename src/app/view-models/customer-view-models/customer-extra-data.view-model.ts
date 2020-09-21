import { CustomerExtraInformationDataVM } from "./customer-extra-information-data.view-model";

export class CustomerExtraDataVM {
  public readonly id: string;
  public readonly customerId: string;
  public readonly customerExtraInformationDatas: CustomerExtraInformationDataVM[];
  public readonly isDelete: boolean;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class CustomerExtraDataCM {
  public readonly customerId: string;
}

export class CustomerExtraDataUM {
  public readonly id: string;
  public readonly customerId: string;
}