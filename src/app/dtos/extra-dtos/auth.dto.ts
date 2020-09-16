import { ApiProperty } from "@nestjs/swagger";

export class AuthVM {
    public readonly Id: string;
    public readonly Username: string;
    public readonly Fullname: string;
    public readonly Email: string;
    public readonly Phone: string;
    public readonly IsDelete: boolean;
    public readonly CreatedAt: Date;
    public readonly UpdatedAt: Date;
    constructor(props: { Fullname: string, Username: string, Email: string, Phone: string, Id: string, IsDelete: boolean, CreatedAt: Date, UpdatedAt: Date }) {
        this.Username = props.Username;
        this.Fullname = props.Fullname;
        this.Email = props.Email;
        this.Phone = props.Phone;
        this.Id = props.Id;
        this.IsDelete = props.IsDelete;
        this.CreatedAt = props.CreatedAt;
        this.UpdatedAt = props.UpdatedAt;
    }
}

export class AuthTM {
    public readonly AccessToken: string;
    public readonly ExperiedIn: string;
    public readonly Roles: string[];
    constructor(props: { AccessToken: string, ExperiedIn: string, Roles: string[] }) {
        this.AccessToken = props.AccessToken;
        this.ExperiedIn = props.ExperiedIn;
        this.Roles = props.Roles;
    }
}

export class AuthCM {

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly Password: string;

    @ApiProperty({ required: true, format: 'string', minLength: 10, pattern: "(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}" })
    public readonly Phone: string;

    constructor(props: { Password: string, Phone: string }) {
        this.Password = props.Password;
        this.Phone = props.Phone;
    }
}
