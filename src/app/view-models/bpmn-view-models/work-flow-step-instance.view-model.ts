import { AccountVM } from "../account-view-models";
import { CustomerVM } from "../customer-view-models";
import { FormDataVM } from "../form-view-models";

export class WFStepInstanceVM {
  public readonly id: string;
  public readonly status: string;
  public readonly note: string;
  public readonly wFStep: string;
  public readonly wFInstance: string;
  public readonly customers: CustomerVM[];
  public readonly accounts: AccountVM[];
  public readonly formDatas: FormDataVM[];
  public readonly isDelete: boolean;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class WFStepInstanceCM {
  public readonly status: string;
  public readonly note: string;
  public readonly wFStepId: string;
  public readonly wFInstanceId: string;
}

export class WFStepInstanceUM {
  public readonly id: string;
  public readonly status: string;
  public readonly note: string;
  public readonly wFStepId: string;
  public readonly wFInstanceId: string;
}