import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { ProcessInstanceVM, ProcessStepVM, TaskVM } from ".";
import { CommentVM } from "../basic-view-models";
import { FormDataVM } from "../form-view-models";

export class ProcessStepInstanceVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly status: string;

  @AutoMap()
  public readonly note: string;

  public readonly processStep: ProcessStepVM;

  public readonly processInstance: ProcessInstanceVM;

  public readonly tasks: TaskVM[];

  public readonly comments: CommentVM[];

  public readonly formDatas: FormDataVM[];

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

export class ProcessStepInstanceCM {
  @ApiProperty()
  public readonly status: string;
  @ApiProperty()
  public readonly note: string;
  public readonly processStep: ProcessStepVM;

  public readonly processInstance: ProcessInstanceVM;
}

export class ProcessStepInstanceUM {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly status: string;
  @ApiProperty()
  public readonly note: string;
  public readonly processStep: ProcessStepVM;

  public readonly processInstance: ProcessInstanceVM;
}