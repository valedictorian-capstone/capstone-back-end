import { AutoMap } from "nestjsx-automapper";

export class WFConditionVM {
  @AutoMap()
  public readonly id!: string;
  @AutoMap()
  public readonly conditionId!: string;
  @AutoMap()
  public readonly wFId!: string;
  @AutoMap()
  public readonly isDelete!: boolean;
  @AutoMap()
  public readonly createdBy!: string;
  @AutoMap()
  public readonly updatedBy!: string;
  @AutoMap()
  public readonly createdAt!: Date;
  @AutoMap()
  public readonly updatedAt!: Date;
}

export class WFConditionCM {
  public readonly conditionId!: string;
  public readonly wFId!: string;
}

export class WFConditionUM {
  public readonly id!: string;
  public readonly conditionId!: string;
  public readonly wFId!: string;
}