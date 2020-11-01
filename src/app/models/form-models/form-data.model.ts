import { AutoMap } from 'nestjsx-automapper';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { ProcessStepInstance } from '../bpmn-models/process-step-instance.model';
import { FormGroup } from './form-group.model';

@Entity()
export class FormData extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => ProcessStepInstance, processStepInstance => processStepInstance.formDatas)
    public processStepInstance: ProcessStepInstance;

    @ManyToOne(() => FormGroup, formGroup => formGroup.formDatas)
    public formGroup: FormGroup;

    @Column("json", { default: null })
    public value: any;

    @AutoMap()
    @Column({ default: null })
    public createdBy: string;

    @AutoMap()
    @Column({ default: null })
    public updatedBy: string;

    @AutoMap()
    @Column({ default: false })
    public isDelete: boolean;

    @AutoMap()
    @CreateDateColumn()
    public createdAt: Date;

    @AutoMap()
    @UpdateDateColumn()
    public updatedAt: Date;

}