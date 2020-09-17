import { Model, IsUUID, Default, PrimaryKey, Column, HasMany, CreatedAt, UpdatedAt, Table } from "sequelize-typescript";
import { uuid } from "uuidv4";
import { AccountRole } from "./account-role.model";
@Table
export class Role extends Model<Role> {

    @IsUUID(4)
    @Default(uuid)
    @PrimaryKey
    @Column
    public Id: string;

    @Column
    public Name: string;

    @Column
    public Description: string;

    @HasMany(() => AccountRole)
    public AccountRoles: AccountRole[];

    @Column
    public CreatedBy: string;

    @Column
    public UpdatedBy: string;

    @Default(false)
    @Column
    public IsDelete: boolean;

    @CreatedAt
    public CreatedAt: Date;

    @UpdatedAt
    public UpdatedAt: Date;
}