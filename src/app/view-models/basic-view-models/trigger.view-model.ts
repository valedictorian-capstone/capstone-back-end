import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { GroupVM } from "./group.view-model";

export class TriggerVM {
    @AutoMap()
    public readonly id: string;
    
    @AutoMap()
    public readonly name: string;

    @AutoMap()
    public readonly code: string;
    
    @AutoMap()
    public readonly description: string;

    @AutoMap()
    public readonly content: string;
  
    @AutoMap()
    public readonly date: Date;

    public readonly groups: GroupVM[];

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

export class TriggerCM{

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly name: string;
  
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly description: string;

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly code: string;

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly content: string;

    @ApiProperty({ required: true })
    public readonly date: Date;

    @ApiProperty({ required: true })
    public readonly group: {id: string}[];

}

export class TriggerUM{

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;
    
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly name: string;
  
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly description: string;

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly code: string;

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly content: string;

    @ApiProperty({ required: true })
    public readonly date: Date;

    @ApiProperty({ required: true })
    public readonly group: {id: string}[];

}