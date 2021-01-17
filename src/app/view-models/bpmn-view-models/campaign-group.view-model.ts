import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { GroupVM } from "../basic-view-models";
import { CampaignVM } from "../bpmn-view-models";

export class CampaignGroupVM {

    @AutoMap()
    public readonly id: string;

    public readonly parameters: any;

    public readonly group: GroupVM;

    public readonly campaign: CampaignVM;

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

export class CampaignGroupCM {
    
    @AutoMap()
    @ApiProperty({ required: true, format: 'any', minLength: 2 })
    public readonly parameters: any;
        
    @AutoMap()
    @ApiProperty()
    public readonly group: {id : string};
}

export class CampaignGroupUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;

    @AutoMap()
    @ApiProperty({ required: true, format: 'any', minLength: 2 })
    public readonly parameters: any;
}