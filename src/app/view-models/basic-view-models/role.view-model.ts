import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { RolePermissionVM } from "../bpmn-view-models";
import { AccountRoleVM } from "./account-role.view-model";

export class RoleVM {
  @AutoMap()
  public readonly Id: string;

  @AutoMap()
  public readonly Name: string;

  @AutoMap()
  public readonly Description: string;

  @AutoMap()
  public readonly AccountRoles: AccountRoleVM[];

  @AutoMap()
  public readonly RolePermissionVMs: RolePermissionVM[];

  @AutoMap()
  public readonly IsDelete!: boolean;

  @AutoMap()
  public readonly CreatedBy!: string;

  @AutoMap()
  public readonly UpdatedBy!: string;

  @AutoMap()
  public readonly CreatedAt!: Date;

  @AutoMap()
  public readonly UpdatedAt!: Date;

  constructor(props: Partial<RoleVM>) {
    Object.assign(this, props);
  }
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