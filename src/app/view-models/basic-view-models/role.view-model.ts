import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { AccountVM } from "./account.view-model";

export class RoleVM {
  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly Description: string;

  public readonly accounts: AccountVM[];

  // public readonly RolePermissionVMs: RolePermissionVM[];

  @AutoMap()
  public readonly isDelete!: boolean;

  @AutoMap()
  public readonly createdBy!: string;

  @AutoMap()
  public readonly updatedBy!: string;

  @AutoMap()
  public readonly createdAt!: Date;

  @AutoMap()
  public readonly updatedAt!: Date;
}

export class RoleCM {

  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly name: string;

  @ApiProperty({ required: false, format: 'string', minLength: 8 })
  public readonly description: string;
}

export class RoleUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly id: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly name: string;

  @ApiProperty({ required: false, format: 'string', minLength: 8 })
  public readonly description: string;
}