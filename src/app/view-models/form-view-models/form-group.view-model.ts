import { FormControlVM } from "./form-control.view-model";
import { FormDataVM } from "./form-data.view-model";
import { FormGroupWFStepVM } from "../bpmn-view-models/form-group-work-flow-step.view-model";
import { AutoMap } from "nestjsx-automapper";
import { ApiProperty } from "@nestjs/swagger";

export class FormGroupVM {

  @AutoMap()
  public readonly id:  string;

  @AutoMap()
  public readonly name:  string;

  @AutoMap()
  public readonly description:  string;

  @AutoMap(() => FormControlVM)
  public readonly formControls:  FormControlVM[];

  @AutoMap(()=> FormDataVM)
  public readonly formDatas:  FormDataVM[];

  @AutoMap(()=>FormGroupWFStepVM)
  public readonly formGroupWFSteps:  FormGroupWFStepVM[];

  @AutoMap()
  public readonly isDelete:  boolean;

  @AutoMap()
  public readonly createdBy:  string;

  @AutoMap()
  public readonly updatedBy:  string;

  @AutoMap()
  public readonly createdAt:  Date;

  @AutoMap()
  public readonly updatedAt:  Date;

}

export class FormGroupCM {
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Name:  string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly Description:  string;
}

export class FormGroupUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id:  string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name:  string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description:  string;
}