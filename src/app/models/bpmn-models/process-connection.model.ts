import { Process } from "@models";
import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProcessStep } from "./process-step.model";

@Entity()
export class ProcessConnection extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false , default: ''})
    public name: string;

    @AutoMap()
    @Column({ length: 500 , default: ''})
    public description: string;

    @AutoMap()
    @Column({ default: null })
    public type: string;
    
    @Column("json")
    public props: any
    // @AutoMap(() =>  ProcessStep, 1)
    @ManyToOne(() => ProcessStep, processStep => processStep.processFromConnections)
    public fromProcessStep: ProcessStep;

    // @AutoMap(()=> ProcessStep, 1)
    @ManyToOne(() => ProcessStep, processStep => processStep.processToConnections)
    public toProcessStep: ProcessStep;

    @ManyToOne(() => Process, process => process.processConnections)
    public process: Process;

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