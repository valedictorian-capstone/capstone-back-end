import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WFInstance } from './wf-instance.model';
import { WFStep } from './wf-step.model';
import { FormData } from '../form-models/form-data.model';
import { Customer } from '../customer-models/customer.model';
import { Task } from './task.model';

@Entity()
export class WFStepInstance extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public status: string;

  @AutoMap()
  @Column({ default: null })
  public note: string;

  @AutoMap(() => WFStep, 1)
  @ManyToOne(
    () => WFStep,
    wFStep => wFStep.wFStepsInstances,
  )
  public wFStep: WFStep;

  @AutoMap(() => WFStepInstance, 1)
  @ManyToOne(
    () => WFInstance,
    wFStep => wFStep.wFStepInstances,
  )
  public wFInstance: WFInstance;

  @AutoMap(() => FormData, 1)
  @OneToMany(() => FormData, formDatas => formDatas.wFStepInstance)
  public formDatas: FormData[];

  @OneToMany(() => Task, task => task.wfStepInstance)
  public tasks: Task[];

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
