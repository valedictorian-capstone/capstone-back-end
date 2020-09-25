import { AutoMap } from "nestjsx-automapper";

export class WFConnectionVM {
  @AutoMap()
  public readonly id!: string;
  @AutoMap()
  public readonly type!: string;
  @AutoMap()
  public readonly description!: string;
  @AutoMap()
  public readonly fromWFStepId!: string;
  @AutoMap()
  public readonly toWFStepId!: string;
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

  constructor(props: Partial<WFConnectionVM>) {
    Object.assign(this, props);
  }
}

export class WFConnectionCM {
  public readonly type!: string;
  public readonly description!: string;
  public readonly fromWFStepId!: string;
  public readonly toWFStepId!: string;
}

export class WFConnectionUM {
  public readonly id!: string;
  public readonly type!: string;
  public readonly description!: string;
  public readonly fromWFStepId!: string;
  public readonly toWFStepId!: string;
}