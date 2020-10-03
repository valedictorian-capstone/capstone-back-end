import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { DepartmentVM } from ".";
import { AccountVM } from "./account.view-model";

export class AccountDepartmentVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly isDelete: boolean;
  
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
  
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;
}

export class AccountDepartmentUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true, type: {$ref: getSchemaPath(AccountVM)} })
  public readonly account: AccountVM;
  
  @ApiProperty({ required: true, type: {$ref: getSchemaPath(DepartmentVM)} })
  public readonly department: DepartmentVM;
  
  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly value: string;
}