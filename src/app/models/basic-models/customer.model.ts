import { Model, PrimaryKey, Column, HasMany, Default, CreatedAt, UpdatedAt, Table, IsUUID, Unique } from 'sequelize-typescript';
import { uuid } from 'uuidv4';
import { CustomerGroup } from './customer-group';
@Table
export class Customer extends Model<Customer> {
    @IsUUID(4)
    @Default(uuid)
    @PrimaryKey
    @Column
    public Id!: string;

    @Column
    public Fullname!: string;

    @Unique
    @Column
    public Email!: string;

    @Unique
    @Column
    public Phone!: string;

    @HasMany(() => CustomerGroup)
    public CustomerGroup!: CustomerGroup[];

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