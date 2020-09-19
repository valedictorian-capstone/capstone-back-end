import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { RolePermissionVM } from "../bpmn-view-models";
import { AccountVM } from "./account.view-model";

export class RoleVM {
  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly Description: string;

  @AutoMap(() => AccountVM)
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
  public readonly Name: string;

  @ApiProperty({ required: false, format: 'string', minLength: 8 })
  public readonly Description: string;
}

export class RoleUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly Id: string;
  
  @ApiProperty({ required: true, format: 'string', minLength: 8 })
  public readonly Name: string;

  @ApiProperty({ required: false, format: 'string', minLength: 8 })
  public readonly Description: string;
}