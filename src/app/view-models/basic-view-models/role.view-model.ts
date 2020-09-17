import { ApiProperty } from "@nestjs/swagger";
import { RolePermissionVM } from "../bpmn-view-models";
import { AccountRoleVM } from "./account-role.view-model";

export class RoleVM {
  public readonly Id: string;

  public readonly Name: string;

  public readonly Description: string;

  public readonly AccountRoles: AccountRoleVM[];

  public readonly RolePermissionVMs: RolePermissionVM[];

  public readonly IsDelete!: boolean;

  public readonly CreatedBy!: string;

  public readonly UpdatedBy!: string;

  public readonly CreatedAt!: Date;

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