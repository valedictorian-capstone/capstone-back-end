import { WF } from "@models";
import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WFStep } from "./wf-step.model";

@Entity()
export class WFConnection extends BaseEntity {

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
    // @AutoMap(() =>  WFStep, 1)
    @ManyToOne(() => WFStep, wFStep => wFStep.wfFromConnections)
    public fromWFStep: WFStep;

    // @AutoMap(()=> WFStep, 1)
    @ManyToOne(() => WFStep, wFStep => wFStep.wfToConnections)
    public toWFStep: WFStep;

    @ManyToOne(() => WF, wf => wf.wfConnections)
    public wf: WF;

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