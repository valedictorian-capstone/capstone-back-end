import { Model, IsUUID, Default, PrimaryKey, Column, HasMany, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, Table, Length } from 'sequelize-typescript';
import {uuid} from 'uuidv4';
import { WorkFlow } from './work-flow.model';
import { WorkFlowConnection } from './work-flow-connection.model';

@Table
export class WorkFlowInstance extends Model<WorkFlowInstance> {
    
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
    
    @ForeignKey(() => WorkFlow)
    @Column
    public WorkFlowId!: string;

    @BelongsTo(() => WorkFlow, "WorkFlowId")
    public WorkFlow!: WorkFlow;

    @HasMany(() => WorkFlowConnection)
    public WorkFlowConnections!: WorkFlowConnection[];

    @Default(false)
    @Column
    public IsDelete!: boolean;

    @CreatedAt
    public CreatedAt!: Date;

    @UpdatedAt
    public UpdatedAt!: Date;
}