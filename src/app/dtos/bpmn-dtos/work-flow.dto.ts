import { ApiProperty } from "@nestjs/swagger";

export class WorkFlowVM {
    public readonly Id: string;
    public readonly Name: string;
    public readonly Description: string;
    public readonly IsDelete: boolean;
    public readonly CreatedAt: Date;
    public readonly UpdatedAt: Date;
    constructor(props: { Id: string, Name: string, Description: string, IsDelete: boolean, CreatedAt: Date, UpdatedAt: Date }) {
        this.Id = props.Id;
        this.Name = props.Name;
        this.Description = props.Description;
        this.IsDelete = props.IsDelete;
        this.CreatedAt = props.CreatedAt;
        this.UpdatedAt = props.UpdatedAt;
    }
}

export class WorkFlowUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly Id: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly Name: string;
    
    @ApiProperty({ format: 'string', minLength: 0, maxLength: 500 })
    public readonly Description: string;

    constructor(props: { Id: string, Name: string, Description: string }) {
        this.Id = props.Id;
        this.Name = props.Name;
        this.Description = props.Description;
    }
}

export class WorkFlowCM {

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly Name: string;

    @ApiProperty({ format: 'string', minLength: 0, maxLength: 500 })
    public readonly Description: string;
    
    constructor(props: { Name: string, Description: string }) {
        this.Name = props.Name;
        this.Description = props.Description;
    }
}
