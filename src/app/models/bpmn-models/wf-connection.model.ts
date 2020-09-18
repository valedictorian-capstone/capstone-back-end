import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WFStep } from "./wf-step.model";

@Entity()
export class WFConnection extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ nullable: false })
    public name: string;

    @Column({ length: 500 })
    public description: string;

    @Column()
    public type: string;

    @OneToOne(() => WFStep)
    public preWFStep: WFStep;

    @OneToOne(() => WFStep)
    public nxtWFStep: WFStep;

    @Column()
    public createdBy: string;

    @Column()
    public updatedBy: string;

    @Column({default: false})
    public isDelete: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}