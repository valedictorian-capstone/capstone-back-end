import { AccountExtraInformationPatternVM, CustomerExtraInformationPatternVM } from "../basic-view-models";
import { RolePermissionVM } from "./role-permission.view-model";

export class PatternVM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
  public readonly CustomerExtraInformationPatternVMs!: CustomerExtraInformationPatternVM[];
  public readonly AccountExtraInformationPatternVMs!: AccountExtraInformationPatternVM[];
  public readonly RolePermissionVMs!: RolePermissionVM[];
  public readonly IsDelete!: boolean;
  public readonly CreatedBy!: string;
  public readonly UpdatedBy!: string;
  public readonly CreatedAt!: Date;
  public readonly UpdatedAt!: Date;
}

export class PatternCM {
  public readonly Name!: string;
  public readonly Description!: string;
}

export class PatternUM {
  public readonly Id!: string;
  public readonly Name!: string;
  public readonly Description!: string;
}