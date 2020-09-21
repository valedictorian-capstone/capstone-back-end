import { AutoMap } from "nestjsx-automapper";

export class FormValueVM {
  @AutoMap()
  public readonly id: string;
  @AutoMap()
  public readonly formControlId: string;
  @AutoMap()
  public readonly formDataId: string;
  @AutoMap()
  public readonly value: string;
  @AutoMap()
  public readonly isDelete: boolean;
  @AutoMap()
  public readonly createdBy: string;
  @AutoMap()
  public readonly updatedBy: string;
  @AutoMap()
  public readonly createdAt: Date;
  @AutoMap()
  public readonly updatedAt: Date;
}

export class FormValueCM {
  public readonly formControlId: string;
  public readonly formDataId: string;
  public readonly value: string;
}

export class FormValueUM {
  public readonly id: string;
  public readonly formControlId: string;
  public readonly formDataId: string;
  public readonly value: string;
}