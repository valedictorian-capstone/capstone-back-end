export class RolePermissionVM {
  public readonly Id!: string;
  public readonly RoleId!: string;
  public readonly PermissionId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class RolePermissionCM {
  public readonly RoleId!: string;
  public readonly PermissionId!: string;
}

export class RolePermissionUM {
  public readonly Id!: string;
  public readonly RoleId!: string;
  public readonly PermissionId!: string;
}