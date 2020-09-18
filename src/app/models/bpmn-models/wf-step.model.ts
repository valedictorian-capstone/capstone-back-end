import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { WFStepInstance } from './wf-step-instance.model';
import { WF } from './wf.model';

export class WFStep extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public name: string;

  @Column()
  public type: string;

  @Column()
  public subType: string;
  
  @Column()
  public description: string;

  @ManyToOne(() => WF, wF => wF.wFStep)
  public wF: WF;

  @OneToMany(() => WFStep, wFStep => wFStep.wFStepsInstances)
  public wFStepsInstances: WFStepInstance[];

  @Column()
  public createdBy: string;

  @Column()
  public updatedBy: string;

  @Column({ default: false })
  public isDelete: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
