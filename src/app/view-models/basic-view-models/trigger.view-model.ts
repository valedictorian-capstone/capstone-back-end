
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { EventVM } from "./event.view-model";

export class TriggerVM {
    @AutoMap()
    public readonly id: string;
  
    @AutoMap()
    public readonly time: Date;

    public readonly event: EventVM;

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

    @ApiProperty({ required: true })
    public readonly time: Date;

    @ApiProperty({ required: true })
    public readonly event: {id: string};

}

export class TriggerUM{

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;

    @ApiProperty({ required: true })
    public readonly time: Date;

    @ApiProperty({ required: true })
    public readonly event: {id: string};

}