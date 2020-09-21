import { CustomerGroupVM } from "./customer-group.view-model";

export class GroupVM {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly customerGroupVMs: CustomerGroupVM[];
  public readonly isDelete: boolean;
  public readonly createdBy: string;
  public readonly updatedBy: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class GroupCM {
  public readonly name: string;
  public readonly description: string;
}

export class GroupUM {
  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
}