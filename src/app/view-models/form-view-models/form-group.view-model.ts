import { FormControlVM } from "./form-control.view-model";
import { FormDataVM } from "./form-data.view-model";
import { FormGroupWFStepVM } from "../bpmn-view-models/form-group-work-flow-step.view-model";
import { AutoMap } from "nestjsx-automapper";

export class FormGroupVM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly name: string;
  @AutoMap()
  public readonly description: string;
  @AutoMap(() => FormControlVM, 1)
  public readonly formControlVMs: FormControlVM[];
  @AutoMap(() => FormDataVM, 1)
  public readonly formDataVMs: FormDataVM[];
  @AutoMap(() => FormGroupWFStepVM, 1)
  public readonly formGroupWFStepVMs: FormGroupWFStepVM[];
  @AutoMap()
  public readonly isDelete: boolean;
  @AutoMap()
  public readonly createdBy: string;
  @AutoMap()
  public readonly updatedBy: string;
  @AutoMap()
  public readonly createdAt: Date;
  @AutoMap()
  public readonly updatedAt: Date;
}

export class FormGroupCM {
  public readonly Name: string;
  public readonly Description: string;
}

export class FormGroupUM {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
}