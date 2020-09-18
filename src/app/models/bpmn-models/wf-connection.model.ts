import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WFStep } from "./wf-step.model";

@Entity()
export class WFConnection extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false })
    public name: string;

    @AutoMap()
    @Column({ length: 500 })
    public description: string;

    @AutoMap()
    @Column({ default: null })
    public type: string;

    @AutoMap()
    @OneToOne(() => WFStep)
    public preWFStep: WFStep;

    @AutoMap()
    @OneToOne(() => WFStep)
    public nxtWFStep: WFStep;

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