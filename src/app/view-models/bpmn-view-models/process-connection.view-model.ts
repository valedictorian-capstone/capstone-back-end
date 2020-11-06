import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { ProcessVM } from ".";
import { ProcessStepVM } from './process-step.view-model';

export class ProcessConnectionVM {
  @AutoMap()
  public readonly id: string;
  public readonly fromProcessStep!: ProcessStepVM;
  public readonly toProcessStep!: ProcessStepVM;
  @AutoMap()
  public readonly description: string;
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

  constructor(props: Partial<ProcessConnectionVM>) {
    Object.assign(this, props);
  }
}

export class ProcessConnectionCM {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public readonly type: string;
  @ApiProperty()
  public description: string;
  public fromProcessStep: ProcessStepVM;
  public toProcessStep: ProcessStepVM;
  public process: ProcessVM;
}

export class ProcessConnectionUM {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public type: string;
  @ApiProperty()
  public description: string;
  public fromProcessStep: ProcessStepVM;
  public toProcessStep: ProcessStepVM;
  public process: ProcessVM;
}