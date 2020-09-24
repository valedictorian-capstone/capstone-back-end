import { AutoMap } from "nestjsx-automapper";
import { FormValueVM } from "./form-value.view-model";
import { WFStepInstanceVM } from "../bpmn-view-models/work-flow-step-instance.view-model";
import { FormGroupVM } from "./form-group.view-model";
import { ApiProperty } from "@nestjs/swagger";

export class FormDataVM {
  
  @AutoMap()
  public readonly id: string;
  
  public readonly wFStepInstance: WFStepInstanceVM;
  
  public readonly formGroup: FormGroupVM;
  
  public readonly formValues: FormValueVM[];
  
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
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly wFStepInstanceId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formGroupId: string;
}

export class FormDataUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly wFStepInstanceId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formGroupId: string;
}