import { ApiProperty } from "@nestjs/swagger";

export class AccountRoleVM {

  public readonly Id: string;

  public readonly AccountId: string;

  public readonly RoleId: string;

  public readonly IsDelete: boolean;

  public readonly CreatedBy: string;

  public readonly UpdatedBy: string;

  public readonly CreatedAt: Date;

  public readonly UpdatedAt: Date;

  constructor(props: Partial<AccountRoleVM>) {
    Object.assign(this, props);
  }
}

export class AccountRoleCM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly AccountId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly RoleId: string;
}

export class AccountRoleUM {
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly Id: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly AccountId: string;

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public readonly RoleId: string;
}