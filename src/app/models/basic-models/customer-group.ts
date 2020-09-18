import { Model, PrimaryKey, Column, HasMany, Default, CreatedAt, UpdatedAt, Table, IsUUID, Unique, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from "./customer.model";
import { Group } from "./group.model";
import { uuid } from 'uuidv4';

@Table
export class CustomerGroup extends Model<CustomerGroup> {
    @IsUUID(4)
    @Default(uuid)
    @PrimaryKey
    @Column
    public Id!: string;

    @ForeignKey(() => Customer)
    @Column
    public CustomerId!: string;

    @BelongsTo(() => Customer, "CustomerId")
    public Customer!: Customer;

    @ForeignKey(() => Group)
    @Column
    public GroupId!: string;

    @BelongsTo(() => Group, "GroupId")
    public Group!: Group;
}