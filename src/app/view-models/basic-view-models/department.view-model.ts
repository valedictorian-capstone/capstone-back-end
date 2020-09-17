import { AccountDepartmentVM } from "./account-department.view-model";

export class DepartmentVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Level!: string;
  public readonly ParentId!: string;
  public readonly AccountDepartmentVMs!: AccountDepartmentVM[];
  public readonly Childrens!: DepartmentVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class DepartmentCM {
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Level!: string;
  public readonly ParentId!: string;
}

export class DepartmentUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly Level!: string;
  public readonly ParentId!: string;
}