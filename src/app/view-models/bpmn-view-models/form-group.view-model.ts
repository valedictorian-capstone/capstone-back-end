import { FormControlVM } from "./form-control.view-model";
import { FormDataVM } from "./form-data.view-model";
import { FormGroupWorkFlowStepVM } from "./form-group-work-flow-step.view-model";

export class FormGroupVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly FormControlVMs!: FormControlVM[];
  public readonly FormDataVMs!: FormDataVM[];
  public readonly FormGroupWorkFlowStepVMs!: FormGroupWorkFlowStepVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class FormGroupCM {
  public readonly Name!: string;
  public readonly Description!: string;
}

export class FormGroupUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
}