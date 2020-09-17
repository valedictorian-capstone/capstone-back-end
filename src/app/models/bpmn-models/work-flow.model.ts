import { Model, Table, IsUUID, Default, PrimaryKey, Column, Length, HasMany, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { uuid } from 'uuidv4';
import { WorkFlowInstance } from '..';

@Table
export class WorkFlow extends Model<WorkFlow> {
    @IsUUID(4)
    @Default(uuid)
    @PrimaryKey
    @Column
    public Id!: string;

    @Column
    public Name!: string;

    @Length({ max: 500, min: 0 })
    @Column
    public Description?: string;

    @HasMany(() => WorkFlowInstance)
    public WorkFlowInstances!: WorkFlowInstance[];

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