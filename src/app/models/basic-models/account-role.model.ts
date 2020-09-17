import { Model, IsUUID, Default, PrimaryKey, Column, ForeignKey, BelongsTo, Table, CreatedAt, UpdatedAt } from "sequelize-typescript";
import {uuid} from "uuidv4";
import { Account } from "./account.model";
import { Role } from "./role.model";

@Table
export class AccountRole extends Model<AccountRole> {
    
    @IsUUID(4)
    @Default(uuid)
    @PrimaryKey
    @Column
    public Id!: string;

    @ForeignKey(() => Account)
    @Column
    public AccountId!: string;

    @BelongsTo(() => Account, "AccountId")
    public Account!: Account;

    @ForeignKey(() => Role)
    @Column
    public RoleId!: string;

    @BelongsTo(() => Role, "RoleId")
    public Role!: Role;

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