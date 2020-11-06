import { ApiProperty } from '@nestjs/swagger';
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

  public readonly options: any;

  public readonly validator: any;
  
  @AutoMap()
  public readonly type: string;
  
  @AutoMap()
  public readonly subType: string;
  
  @AutoMap()
  public readonly xs: number;

  @AutoMap()
  public readonly sm: number;

  @AutoMap()
  public readonly md: number;

  @AutoMap()
  public readonly lg: number;

  @AutoMap()
  public readonly xl: number;

  @AutoMap()
  public readonly xxl: number;
  
  @AutoMap()
  public readonly tooltip: string;
  
  @AutoMap()
  public readonly color: string;

  @AutoMap()
  public readonly position: number;

  @AutoMap()
  public readonly label: string;
  
  public readonly formGroup: FormGroupVM;
  
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

  @ApiProperty({ required: true })
  public readonly options: {value: any, label: string}[];

  @ApiProperty({ required: true })
  public readonly validator: {value: any, label: string}[];

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly type: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly subType: string;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly xs: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly sm: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly md: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly lg: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly xl: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly xxl: number;

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

  @ApiProperty({ required: true })
  public readonly options: {value: any, label: string}[];

  @ApiProperty({ required: true })
  public readonly validator: {value: any, label: string}[];

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly type: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly subType: string;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly xs: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly sm: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly md: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly lg: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly xl: number;

  @ApiProperty({ required: true, format: 'number', minLength: 2 })
  public readonly xxl: number;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly tooltip: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly color: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly label: string;
}