import { ApiProperty } from "@nestjs/swagger";

export class WorkFlowConnectionVM {
    public readonly Id: string;
    public readonly Type: string;
    public readonly FromWorkFlowInstanceId: string;
    public readonly ToWorkFlowInstanceId: string;
    public readonly Description: string;
    public readonly IsDelete: boolean;
    public readonly CreatedAt: Date;
    public readonly UpdatedAt: Date;
    constructor(props: { Id: string, Type: string, FromWorkFlowInstanceId: string, ToWorkFlowInstanceId: string, Description: string, IsDelete: boolean, CreatedAt: Date, UpdatedAt: Date }) {
        this.Id = props.Id;
        this.Type = props.Type;
        this.FromWorkFlowInstanceId = props.FromWorkFlowInstanceId;
        this.ToWorkFlowInstanceId = props.ToWorkFlowInstanceId;
        this.Description = props.Description;
        this.IsDelete = props.IsDelete;
        this.CreatedAt = props.CreatedAt;
        this.UpdatedAt = props.UpdatedAt;
    }
}

export class WorkFlowConnectionUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly Id: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly Type: string;

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly FromWorkFlowInstanceId: string;

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly ToWorkFlowInstanceId: string;
    
    @ApiProperty({ format: 'string', minLength: 0, maxLength: 500 })
    public readonly Description: string;

    constructor(props: { Id: string, Type: string, FromWorkFlowInstanceId: string, ToWorkFlowInstanceId: string, Description: string }) {
        this.Id = props.Id;
        this.Type = props.Type;
        this.FromWorkFlowInstanceId = props.FromWorkFlowInstanceId;
        this.ToWorkFlowInstanceId = props.ToWorkFlowInstanceId;
        this.Description = props.Description;
    }
}

export class WorkFlowConnectionCM {

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly Type: string;

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly FromWorkFlowInstanceId: string;

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly ToWorkFlowInstanceId: string;

    @ApiProperty({ format: 'string', minLength: 0, maxLength: 500 })
    public readonly Description: string;
    
    constructor(props: { Type: string, FromWorkFlowInstanceId: string, ToWorkFlowInstanceId: string, Description: string }) {
        this.Type = props.Type;
        this.FromWorkFlowInstanceId = props.FromWorkFlowInstanceId;
        this.ToWorkFlowInstanceId = props.ToWorkFlowInstanceId;
        this.Description = props.Description;
    }
}
