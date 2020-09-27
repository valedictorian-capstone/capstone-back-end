import { ApiProperty } from "@nestjs/swagger";
import { AccountVM } from "@view-models";
import { AutoMap } from "nestjsx-automapper";


export class DepartmentVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly name: string;
  
  @AutoMap()
  public readonly description: string;
  
  public readonly departmentChildrens: DepartmentVM[];

  public readonly departmentParent: DepartmentVM;

  public readonly accounts: AccountVM[];
  
}

export class DepartmentCM {
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly name: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly description: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly departmentParent: string;
}

export class DepartmentUM {
  
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly name: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly description: string;
  
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly departmentParent: string;
  
}