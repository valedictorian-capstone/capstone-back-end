<<<<<<< HEAD
import { AutoMap } from "nestjsx-automapper";

export class FormValueVM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly formControlId: string;
  @AutoMap()
  public readonly formDataId: string;
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
=======
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { FormControlVM } from "./form-control.view-model";
import { FormDataVM } from "./form-data.view-model";

export class FormValueVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap(()=>FormControlVM)
  public readonly formControl: FormControlVM;
  
  @AutoMap(()=>FormDataVM)
  public readonly formDataId: FormDataVM;
  
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
  
>>>>>>> ee8f3789debbfef3e297eb16a1a9c67545e21369
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