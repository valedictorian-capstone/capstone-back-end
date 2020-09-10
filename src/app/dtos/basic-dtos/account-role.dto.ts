import { ApiProperty } from "@nestjs/swagger";

export class AccountRoleVM {
    public readonly Id: string;
    public readonly AccountId: string;
    public readonly RoleId: string;
    public readonly IsDelete: boolean;
    public readonly CreatedAt: Date;
    public readonly UpdatedAt: Date;
    constructor(props: { Id: string, AccountId: string, RoleId: string, IsDelete: boolean, CreatedAt: Date, UpdatedAt: Date}) {
        this.Id = props.Id;
        this.AccountId = props.AccountId;
        this.RoleId = props.RoleId;
        this.IsDelete = props.IsDelete;
        this.CreatedAt = props.CreatedAt;
        this.UpdatedAt = props.UpdatedAt;
    }
}

export class AccountRoleUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly Id: string;

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly AccountId: string;

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly RoleId: string;

    constructor(props: { Id: string, AccountId: string, RoleId: string }) {
        this.Id = props.Id;
        this.AccountId = props.AccountId;
        this.RoleId = props.RoleId;
    }
}

export class AccountRoleCM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly AccountId: string;

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly RoleId: string;

    constructor(props: { AccountId: string, RoleId: string }) {
        this.AccountId = props.AccountId;
        this.RoleId = props.RoleId;
    }
}
