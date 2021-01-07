import { Pipeline } from "@models";
import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { GroupVM } from "../basic-view-models";
import { ActivityVM } from "./activity.view-model";
import { AttachmentVM } from "./attachment.view-model";
import { DealVM } from "./deal.view-model";
import { LogVM } from "./log.view-model";
import { NoteVM } from "./note.view-model";

export class CampaignVM {

    @AutoMap()
    public readonly id: string;
  
    @AutoMap()
    public readonly name: string;

    @AutoMap()
    public readonly description: string;

    @AutoMap()
    public readonly type: string;

    @AutoMap()
    public readonly dateStart: Date;

    @AutoMap()
    public readonly dateEnd: Date;

    public readonly groups: GroupVM[];

    public readonly logs: LogVM[];

    public readonly notes: NoteVM[];

    public readonly attachments: AttachmentVM[];

    public readonly activitys: ActivityVM[];

    public readonly deals: DealVM[];

    public readonly pipeline: Pipeline;

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

export class CampaignCM {

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
    @ApiProperty({ required: true, format: 'Date'})
    public dateStart: Date;
    
    @AutoMap()
    @ApiProperty({ required: true, format: 'Date'})
    public dateEnd: Date;

    @AutoMap()
    @ApiProperty()
    public readonly pipeline: {id : string};
    
    @AutoMap()
    @ApiProperty()
    public readonly groups: {id : string}[];

}

export class CampaignUM {

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
    @ApiProperty({ required: true, format: 'Date'})
    public dateStart: Date;
    
    @AutoMap()
    @ApiProperty({ required: true, format: 'Date'})
    public dateEnd: Date;

    @AutoMap()
    @ApiProperty()
    public readonly pipeline: {id : string};
    
    @AutoMap()
    @ApiProperty()
    public readonly groups: {id : string};
    
}