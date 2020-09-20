export class WFConnectionVM {
  public readonly id!: string;
  public readonly type!: string;
  public readonly description!: string;
  public readonly fromWFStepId!: string;
  public readonly toWFStepId!: string;
  public readonly isDelete!: boolean;
  public readonly createdBy!: string;
  public readonly updatedBy!: string;
  public readonly createdAt!: Date;
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