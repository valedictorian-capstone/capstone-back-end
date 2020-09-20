import { FormControlVM } from "./form-control.view-model";
import { FormDataVM } from "./form-data.view-model";
import { FormGroupWFStepVM } from "../bpmn-view-models/form-group-work-flow-step.view-model";

export class FormGroupVM {
  public readonly id:  string;
  public readonly name:  string;
  public readonly description:  string;
  public readonly formControlVMs:  FormControlVM[];
  public readonly formDataVMs:  FormDataVM[];
  public readonly formGroupWFStepVMs:  FormGroupWFStepVM[];
  public readonly isDelete:  boolean;
  public readonly createdBy:  string;
  public readonly updatedBy:  string;
  public readonly createdAt:  Date;
  public readonly updatedAt:  Date;
}

export class FormGroupCM {
  public readonly Name:  string;
  public readonly Description:  string;
}

export class FormGroupUM {
  public readonly id:  string;
  public readonly name:  string;
  public readonly description:  string;
}