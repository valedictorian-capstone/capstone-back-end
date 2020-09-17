import { CustomerGroupVM } from "./customer-group.view-model";

export class GroupVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly CustomerGroupVMs!: CustomerGroupVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class GroupCM {
  public readonly Name!: string;
  public readonly Description!: string;
}

export class GroupUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
}