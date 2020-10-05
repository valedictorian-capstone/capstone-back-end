import { AutoMap } from "nestjsx-automapper";
import { WFVM } from ".";
import { WFStepVM } from './work-flow-step.view-model';

export class WFConnectionVM {
  @AutoMap()
  public readonly id!: string;
  @AutoMap()
  public readonly props!: any;
  @AutoMap()
  public readonly description!: string;
  @AutoMap()
  public readonly isDelete!: boolean;
  // @AutoMap()
  // public readonly createdBy!: string;
  // @AutoMap()
  // public readonly updatedBy!: string;
  // @AutoMap()
  // public readonly createdAt!: Date;
  // @AutoMap()
  // public readonly updatedAt!: Date;

  constructor(props: Partial<WFConnectionVM>) {
    Object.assign(this, props);
  }
}

export class WFConnectionCM {
  public readonly type!: string;
  public readonly description!: string;
  public readonly fromWFStep!: WFStepVM;
  public readonly toWFStep!: WFStepVM;
  public wF: WFVM;
}

export class WFConnectionUM {
  public readonly id!: string;
  public readonly type!: string;
  public readonly description!: string;
  public readonly fromWFStep!: WFStepVM;
  public readonly toWFStep!: WFStepVM;
  public wF: WFVM;
}