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
  public readonly description: string;

  @AutoMap()
  public readonly type: string;

  @AutoMap()
  public readonly subType: string;

  @AutoMap()
  public readonly progress: string;

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

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public name: string;
  
  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public description: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public type: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly subType: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly progress: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'number' })
  public readonly position: number;

  @AutoMap()
  public readonly pipeline: Pipeline;

}

export class StageUM {

  @AutoMap()
  @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
  public id: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public name: string;
  
  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public description: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public type: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly subType: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'string', minLength: 2 })
  public readonly progress: string;

  @AutoMap()
  @ApiProperty({ required: true, format: 'number' })
  public readonly position: number;

  @AutoMap()
  public readonly pipeline: Pipeline;
}