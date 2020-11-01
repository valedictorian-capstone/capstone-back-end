import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Department } from '../basic-models';
import { FormGroup } from '../form-models';
import { ProcessConnection } from './process-connection.model';


import { ProcessStepInstance } from './process-step-instance.model';
import { Process } from './process.model';
import { Task } from './task.model';

@Entity()
export class ProcessStep extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public type: string;

  @AutoMap()
  @Column({ default: null })
  public shape: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;

  @ManyToOne(() => Process, process => process.processSteps)
  public process: Process;

  @OneToMany(() => ProcessStep, processStep => processStep.processStepsInstances)
  public processStepsInstances: ProcessStepInstance[];

  @OneToMany(() => ProcessConnection, processConnection => processConnection.fromProcessStep)
  public processFromConnections: ProcessConnection[];

  @OneToMany(() => ProcessConnection, processConnection => processConnection.toProcessStep)
  public processToConnections: ProcessConnection[];

  @OneToMany(() => Task, task => task.processStep)
  public tasks: Task[];

  @ManyToOne(() => Department, department => department.processSteps)
  public department: Department;

  @Column("json")
  public props: any

  @ManyToMany(() => FormGroup, formGroup => formGroup.processSteps)
  public formGroups: FormGroup[];

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
