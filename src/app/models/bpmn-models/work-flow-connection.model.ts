import { Model, IsUUID, Default, PrimaryKey, Column, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, Table, Length } from 'sequelize-typescript';
import { uuid } from 'uuidv4';
import { WorkFlowInstance } from './work-flow-instance.model';

@Table
export class WorkFlowConnection extends Model<WorkFlowConnection> {

    @IsUUID(4)
    @Default(uuid)
    @PrimaryKey
    @Column
    public Id!: string;

    @Column
    public Type!: string;

    @Length({ max: 500, min: 0 })
    @Column
    public Description?: string;

    @ForeignKey(() => WorkFlowInstance)
    @Column
    public FromWorkFlowInstanceId!: string;

    @BelongsTo(() => WorkFlowInstance, "FromWorkFlowInstanceId")
    public FromWorkFlowInstance!: WorkFlowInstance;


    @ForeignKey(() => WorkFlowInstance)
    @Column
    public ToWorkFlowInstanceId!: string;

    @BelongsTo(() => WorkFlowInstance, "ToWorkFlowInstanceId")
    public ToWorkFlowInstance!: WorkFlowInstance;

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