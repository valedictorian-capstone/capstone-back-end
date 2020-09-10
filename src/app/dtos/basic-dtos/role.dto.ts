import { ApiProperty } from "@nestjs/swagger";

export class RoleVM {
    public readonly Id: string;
    public readonly Name: string;
    public readonly IsDelete: boolean;
    public readonly CreatedAt: Date;
    public readonly UpdatedAt: Date;
    constructor(props: { Id: string, Name: string, IsDelete: boolean, CreatedAt: Date, UpdatedAt: Date }) {
        this.Id = props.Id;
        this.Name = props.Name;
        this.IsDelete = props.IsDelete;
        this.CreatedAt = props.CreatedAt;
        this.UpdatedAt = props.UpdatedAt;
    }
}

export class RoleUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly Id: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly Name: string;
    
    constructor(props: { Id: string, Name: string }) {
        this.Id = props.Id;
        this.Name = props.Name;
    }
}

export class RoleCM {

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly Name: string;

    constructor(props: { Name: string }) {
        this.Name = props.Name;
    }
}
