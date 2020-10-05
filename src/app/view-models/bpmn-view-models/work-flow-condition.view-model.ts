import { AutoMap } from "nestjsx-automapper";

export class WFConditionVM {
  @AutoMap()
  public readonly id!: string;
  @AutoMap()
  public readonly conditionId!: string;
  @AutoMap()
  public readonly props!: any;
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
  public readonly description!: string;
  public readonly props!: any;
}

export class WFConditionUM {
  public readonly id!: string;
  public readonly description!: string;
  public readonly props!: any;
}