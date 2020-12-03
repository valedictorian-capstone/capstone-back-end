import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { StageUM, StageVM } from "./stage.view-model";

export class PipelineVM {

    @AutoMap()
    public readonly id: string;
  
    @AutoMap()
    public readonly name: string;

    public readonly stages: StageVM[];

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

export class PipelineCM {

    @AutoMap()
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public name: string;
    
    @AutoMap()
    public stages: StageUM[];

}

export class PipelineUM {

    @AutoMap()
    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public id: string;

    @AutoMap()
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public name: string;
    
    @AutoMap()
    public stages: StageUM[];
    
}