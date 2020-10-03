import { ApiProperty } from '@nestjs/swagger';
import { FormValueVM } from "./form-value.view-model";
import { AutoMap } from 'nestjsx-automapper';
import { FormGroupVM } from './form-group.view-model';

export class FormControlVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly description: string;
  
  @AutoMap()
  public readonly placeHolder: string;
  
  @AutoMap()
  public readonly fontSize: string;
  
  @AutoMap()
  public readonly size: string;
  
  @AutoMap()
  public readonly options: string;
  
  @AutoMap()
  public readonly type: string;
  
  @AutoMap()
  public readonly subType: string;
  
  @AutoMap()
  public readonly width: string;
  
  @AutoMap()
  public readonly height: string;
  
  @AutoMap()
  public readonly isCapitialize: boolean;
  
  @AutoMap()
  public readonly tooltip: string;
  
  @AutoMap()
  public readonly color: string;

  @AutoMap()
  public readonly position: number;

  @AutoMap()
  public readonly label: string;
  
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

export class FormControlCM {
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly placeHolder: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly fontSize: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly size: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly options: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly type: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly subType: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly width: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly height: string;

  @ApiProperty({ required: true, format: 'boolean', minLength: 2 })
  public readonly isCapitialize: boolean;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly tooltip: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly color: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly label: string;
}

export class FormControlUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly name: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly placeHolder: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly fontSize: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly size: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly options: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly type: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly subType: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly width: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly height: string;

  @ApiProperty({ required: true, format: 'boolean', minLength: 2 })
  public readonly isCapitialize: boolean;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly tooltip: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly color: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly label: string;
}