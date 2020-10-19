import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "nestjsx-automapper";
import { AccountVM } from "../account-view-models";
import { WFStepInstanceVM } from "../bpmn-view-models";

export class CommentVM {

    @AutoMap()
    public readonly id: string;

    @AutoMap()
    public readonly value: string;

    public readonly account: AccountVM;

    public readonly wfStepInstance: WFStepInstanceVM;

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

export class CommentCM {

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly value: string;

    @ApiProperty()
    public readonly account: { account: { id: string }};

    @ApiProperty()
    public readonly wfStepInstance: { wfStepInstance: { id: string }};

}

export class CommentUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly id: string;

    @ApiProperty({ required: true, format: 'string', minLength: 2 })
    public readonly value: string;

}