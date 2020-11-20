import { Pipeline } from "@models";
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { DealVM } from "./deal.view-model";
import { PipelineVM } from "./pipeline.view-model";

export class StageVM {

  @AutoMap()
  public readonly id: string;

  @AutoMap()
  public readonly name: string;

  @AutoMap()
  public readonly probability: number;

  @AutoMap()
  public readonly position: number;

  public deals: DealVM[];

  public pipeline: PipelineVM;

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

export class StageCM {

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public name: string;

  @ApiProperty({ required: true, format: 'number' })
  public readonly probability: number;

  @ApiProperty({ required: true, format: 'number' })
  public readonly position: number;

  public readonly pipeline: Pipeline;

}

export class StageUM {

  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public id: string;

  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public name: string;
  
  @ApiProperty({ required: true, format: 'number' })
  public readonly probability: number;

  @ApiProperty({ required: true, format: 'number' })
  public readonly position: number;

  public readonly pipeline: Pipeline;
}