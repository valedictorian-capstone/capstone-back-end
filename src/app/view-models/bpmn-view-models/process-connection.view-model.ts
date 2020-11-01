import { AutoMap } from "nestjsx-automapper";
import { ProcessVM } from ".";
import { ProcessStepVM } from './process-step.view-model';

export class ProcessConnectionVM {
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

  constructor(props: Partial<ProcessConnectionVM>) {
    Object.assign(this, props);
  }
}

export class ProcessConnectionCM {
  public id: string;
  public readonly type!: string;
  public description!: string;
  public fromProcessStep!: ProcessStepVM;
  public toProcessStep!: ProcessStepVM;
  public process: ProcessVM;
  public props: any;
}

export class ProcessConnectionUM {
  public id!: string;
  public type!: string;
  public description!: string;
  public fromProcessStep!: ProcessStepVM;
  public toProcessStep!: ProcessStepVM;
  public process: ProcessVM;
  public props: any;
}