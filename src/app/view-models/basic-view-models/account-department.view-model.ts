export class AccountDepartmentVM {
  public readonly Id!: string;
  public readonly AccountId!: string;
  public readonly DepartmentId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class AccountDepartmentCM {
  public readonly AccountId!: string;
  public readonly DepartmentId!: string;
}

export class AccountDepartmentUM {
  public readonly Id!: string;
  public readonly AccountId!: string;
  public readonly DepartmentId!: string;
}