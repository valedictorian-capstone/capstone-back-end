import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { AccountVM } from ".";
import { DepartmentVM } from "../basic-view-models";

export class AccountDepartmentVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly isDelete: boolean;

  @AutoMap()
  public readonly isModerator: boolean;

  @AutoMap()
  public readonly isSystemAdmin: boolean;

  @AutoMap()
  public readonly isEmployee: boolean;

  
  public readonly account: AccountVM;
  
  public readonly department: DepartmentVM;
  
  @AutoMap()
  public readonly value: string;
  
  @AutoMap()
  public readonly createdBy: string;
  
  @AutoMap()
  public readonly updatedBy: string;
  
  @AutoMap()
  public readonly createdAt: Date;
  
  @AutoMap()
  public readonly updatedAt: Date;
}

export class AccountDepartmentCM {
  
  @ApiProperty({ required: true, type: {$ref: getSchemaPath(AccountVM)} })
  public readonly account: AccountVM;
  
  @ApiProperty({ required: true, type: {$ref: getSchemaPath(DepartmentVM)} })
  public readonly department: DepartmentVM;
  
  @ApiProperty({ required: true, format: 'boolean' })
  public readonly isModerator: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly isSystemAdmin: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly isEmployee: boolean;
}

export class AccountDepartmentUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, type: {$ref: getSchemaPath(AccountVM)} })
  public readonly account: AccountVM;
  
  @ApiProperty({ required: true, type: {$ref: getSchemaPath(DepartmentVM)} })
  public readonly department: DepartmentVM;
  
  @ApiProperty({ required: true, format: 'boolean' })
  public readonly isModerator: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly isSystemAdmin: boolean;

  @ApiProperty({ required: true, format: 'boolean' })
  public readonly isEmployee: boolean;
}