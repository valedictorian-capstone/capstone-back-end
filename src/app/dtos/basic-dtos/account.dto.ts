import { ApiProperty } from "@nestjs/swagger";

export class AccountVM {
    public readonly Id: string;
    public readonly Username: string;
    public readonly Fullname: string;
    public readonly Email: string;
    public readonly Phone: string;
    public readonly IsDelete: boolean;
    public readonly CreatedAt: Date;
    public readonly UpdatedAt: Date;
    constructor(props: { Fullname: string, Username: string, Email: string, Phone: string, Id: string, IsDelete: boolean, CreatedAt: Date, UpdatedAt: Date}) {
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

export class AccountUM {

    @ApiProperty({ required: true, format: 'uuid', minLength: 36 })
    public readonly Id: string;

    @ApiProperty({ required: true, format: 'string' })
    public readonly Username: string;

    @ApiProperty({ required: true, format: 'string' })
    public readonly Fullname: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly Password: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8, pattern: "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"})
    public readonly Email: string;

    @ApiProperty({ required: true, format: 'string', minLength: 10, pattern: "(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}"})
    public readonly Phone: string;
    constructor(props: { Fullname: string, Username: string, Email: string, Phone: string, Id: string}) {
        this.Username = props.Username;
        this.Fullname = props.Fullname;
        this.Email = props.Email;
        this.Phone = props.Phone;
        this.Id = props.Id;
    }
}

export class AccountCM {

    @ApiProperty({ required: true, format: 'string' })
    public readonly Username: string;

    @ApiProperty({ required: true, format: 'string' })
    public readonly Fullname: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8 })
    public readonly Password: string;

    @ApiProperty({ required: true, format: 'string', minLength: 8, pattern: "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"})
    public readonly Email: string;

    @ApiProperty({ required: true, format: 'string', minLength: 10, pattern: "(\(\d{2,4}\)\s{0,1}\d{6,9})$|^\d{8,13}$|^\d{3,5}\s?\d{3}\s?\d{3,4}$|^[\d\(\)\s\-\/]{6,}"})
    public readonly Phone: string;
    
    constructor(props: { Fullname: string, Username: string, Password: string, Email: string, Phone: string}) {
        this.Username = props.Username;
        this.Fullname = props.Fullname;
        this.Password = props.Password;
        this.Email = props.Email;
        this.Phone = props.Phone;
    }
}
