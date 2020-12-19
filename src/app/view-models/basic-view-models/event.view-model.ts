import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { GroupVM } from "./group.view-model";
import { TriggerCM, TriggerVM } from "./trigger.view-model";

export class EventVM {
    @AutoMap()
    public readonly id: string;
    
    @AutoMap()
    public readonly name: string;
    
    @AutoMap()
    public readonly description: string;
    
    @AutoMap()
    public readonly image: string;
  
    @AutoMap()
    public readonly dateStart: Date;

    @AutoMap()
    public readonly dateEnd: Date;

    public readonly groups: GroupVM[];

    public readonly triggers: TriggerVM[];

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

export class EventCM{

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly name: string;
  
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly description: string;

    @ApiProperty({ required: true })
    public readonly dateEnd: Date;

    @ApiProperty({ required: true })
    public readonly dateStart: Date;

    @ApiProperty({ required: true })
    public readonly groups: { id: string }[];
    
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public image: string;

    @ApiProperty({ required: true })
    public readonly triggers: TriggerCM[];

}

export class EventUM{

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;
    
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly name: string;
  
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly description: string;


    @ApiProperty({ required: true })
    public readonly dateEnd: Date;

    @ApiProperty({ required: true })
    public readonly dateStart: Date;

    @ApiProperty({ required: true })
    public readonly groups: { id: string }[];
    
    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public image: string;

    @ApiProperty({ required: true })
    public readonly triggers: TriggerCM[];

}