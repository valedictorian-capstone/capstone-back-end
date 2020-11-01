import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Comment } from '../basic-models';
import { FormData } from '../form-models/form-data.model';
import { Task } from './task.model';
import { ProcessInstance } from './process-instance.model';
import { ProcessStep } from './process-step.model';

@Entity()
export class ProcessStepInstance extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public status: string;

  @AutoMap()
  @Column({ default: null })
  public note: string;

  @AutoMap(() => ProcessStep, 1)
  @ManyToOne(
    () => ProcessStep,
    processStep => processStep.processStepInstances,
  )
  public processStep: ProcessStep;

  @AutoMap(() => ProcessStepInstance, 1)
  @ManyToOne(
    () => ProcessInstance,
    processStep => processStep.processStepInstances,
  )
  public processInstance: ProcessInstance;

  @AutoMap(() => FormData, 1)
  @OneToMany(() => FormData, formDatas => formDatas.processStepInstance)
  public formDatas: FormData[];

  @OneToMany(() => Task, task => task.processStepInstance)
  public tasks: Task[];

  @OneToMany(() => Comment, comments => comments.processStepInstance)
  public comments: Comment[];

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
