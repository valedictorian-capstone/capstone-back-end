import { AutoMap } from "nestjsx-automapper";
import { FormValueVM } from "./form-value.view-model";
// import { WFStepInstanceVM } from "../bpmn-view-models/work-flow-instance.view-model";

export class FormDataVM {
  
  @AutoMap()
  public readonly id: string;
  
  // @AutoMap()
  // public readonly wFStepInstance: WFStepInstanceVM;
  
  @AutoMap()
  public readonly formGroupId: string;
  
  @AutoMap()
  public readonly formValueVMs: FormValueVM[];
  
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

export class FormDataCM {
  public readonly wFStepInstanceId: string;
  public readonly formGroupId: string;
}

export class FormDataUM {
  public readonly id: string;
  public readonly wFStepInstanceId: string;
  public readonly formGroupId: string;
}