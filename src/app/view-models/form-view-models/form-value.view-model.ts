import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { FormControlVM } from "./form-control.view-model";
import { FormDataVM } from "./form-data.view-model";

export class FormValueVM {
  
  @AutoMap()
  public readonly id: string;
  
  public readonly formControl: FormControlVM;
  
  public readonly formData: FormDataVM;
  
  @AutoMap()
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

export class FormValueCM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formControlId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formDataId: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;
}

export class FormValueUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formControlId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly formDataId: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;
}