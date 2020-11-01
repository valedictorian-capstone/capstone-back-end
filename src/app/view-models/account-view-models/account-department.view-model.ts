import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { AccountVM } from ".";
import { DepartmentVM } from "../basic-view-models";

export class AccountDepartmentVM {
  
  @AutoMap()
  public readonly id: string;
  
  @AutoMap()
  public readonly isDelete: boolean;

  @AutoMap()
  public readonly isLeader: boolean;

  @AutoMap()
  public readonly description: string;

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
  
  @ApiProperty({ required: true })
  public readonly account: {id: string};
  
  @ApiProperty({ required: true })
  public readonly department: {id: string};
  
  @ApiProperty({ required: true, format: 'boolean' })
  public readonly isLeader: boolean;

  @ApiProperty({ required: true, format: 'string' })
  public readonly description: string;

}

export class AccountDepartmentUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;

  @ApiProperty({ required: true })
  public readonly account: {id: string};
  
  @ApiProperty({ required: true })
  public readonly department: {id: string};
  
  @ApiProperty({ required: true, format: 'boolean' })
  public readonly isLeader: boolean;
  
  @ApiProperty({ required: true, format: 'string' })
  public readonly description: string;

}