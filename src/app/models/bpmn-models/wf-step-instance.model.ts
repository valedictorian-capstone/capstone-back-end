import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { WFStep } from './wf-step.model';


export class WFStepInstance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public status: string;

  @Column()
  public note: string;

  @ManyToOne(() => WFStep, wFStep => wFStep.wFStepsInstances)
  public wFStep: WFStep;

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
