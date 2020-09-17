import { Model, PrimaryKey, Column, HasMany, Default, CreatedAt, UpdatedAt, Table, IsUUID, Unique } from 'sequelize-typescript';
import { AccountRole } from './account-role.model';
import { uuid } from 'uuidv4';
@Table
export class Account extends Model<Account> {

    @IsUUID(4)
    @Default(uuid)
    @PrimaryKey
    @Column
    public Id!: string;

    @Unique
    @Column
    public Username!: string;

    @Column
    public Fullname!: string;

    @Unique
    @Column
    public Email!: string;

    @Unique
    @Column
    public Phone!: string;

    @Column
    public PasswordHash!: string;

    @HasMany(() => AccountRole)
    public AccountRoles!: AccountRole[];

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
