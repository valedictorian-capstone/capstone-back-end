import { FormValueVM } from "./form-value.view-model";

export class FormDataVM {
  public readonly id: string;
  public readonly wFStepInstanceId: string;
  public readonly formGroupId: string;
  public readonly formValueVMs: FormValueVM[];
  public readonly isDelete: boolean;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class FormDataCM {
  public readonly wFStepInstanceId: string;
  public readonly formGroupId: string;
}

export class FormDataUM {
  public readonly id: string;
  public readonly wFStepInstanceId: string;
  public readonly formGroupId: string;
}