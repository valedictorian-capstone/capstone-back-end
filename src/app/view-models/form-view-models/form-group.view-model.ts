import { FormControlVM, FormControlCM } from "./form-control.view-model";
import { FormDataVM } from "./form-data.view-model";
import { WFStepVM } from "../bpmn-view-models/work-flow-step.view-model";
import { AutoMap } from "nestjsx-automapper";
import { ApiProperty, getSchemaPath } from "@nestjs/swagger";

export class FormGroupVM {

  @AutoMap()
  public readonly id:  string;

  @AutoMap()
  public readonly name:  string;

  @AutoMap()
  public readonly description:  string;

  public readonly formControls:  FormControlVM[];

  public readonly formDatas:  FormDataVM[];

  public readonly wFSteps:  WFStepVM[];

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
  public readonly name:  string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description:  string;

  @ApiProperty({ required: true, type: 'array', items:{$ref: getSchemaPath(FormControlCM)} })
  public readonly formControls: FormControlCM[];

}

export class FormGroupUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id:  string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name:  string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly description:  string;
}