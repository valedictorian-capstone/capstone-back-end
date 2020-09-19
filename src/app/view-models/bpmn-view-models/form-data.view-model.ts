import { FormValueVM } from "./form-value.view-model";

export class FormDataVM {
  public readonly Id!: string;
  public readonly WFStepInstanceId!: string;
  public readonly FormGroupId!: string;
  public readonly FormValueVMs!: FormValueVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class FormDataCM {
  public readonly WFStepInstanceId!: string;
  public readonly FormGroupId!: string;
}

export class FormDataUM {
  public readonly Id!: string;
  public readonly WFStepInstanceId!: string;
  public readonly FormGroupId!: string;
}