export class CustomerGroupVM {
  public readonly Id!: string;
  public readonly CustomerId!: string;
  public readonly GroupId!: string;
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class CustomerGroupCM {
  public readonly CustomerId!: string;
  public readonly GroupId!: string;
}

export class CustomerGroupUM {
  public readonly Id!: string;
  public readonly CustomerId!: string;
  public readonly GroupId!: string;
}