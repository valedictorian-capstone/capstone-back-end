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
  public id: string;
  public readonly type!: string;
  public description!: string;
  public fromWFStep!: WFStepVM;
  public toWFStep!: WFStepVM;
  public wF: WFVM;
  public props: any;
}

export class WFConnectionUM {
  public id!: string;
  public type!: string;
  public description!: string;
  public fromWFStep!: WFStepVM;
  public toWFStep!: WFStepVM;
  public wF: WFVM;
  public props: any;
}