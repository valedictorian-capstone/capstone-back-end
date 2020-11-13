import { AutoMap } from "nestjsx-automapper";
import { FormGroupVM } from "./form-group.view-model";
import { ApiProperty } from "@nestjs/swagger";

export class FormDataVM {
  
  @AutoMap()
  public readonly id: string;
  
  public readonly formGroup: FormGroupVM;
  
  public readonly value: string;
  
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
  public readonly processStepInstanceId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formGroupId: string;

  @ApiProperty({ required: true })
  public readonly value: {value: any, label: string}[];
}

export class FormDataUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly processStepInstanceId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formGroupId: string;

  @ApiProperty({ required: true })
  public readonly value: {value: any, label: string}[];
}