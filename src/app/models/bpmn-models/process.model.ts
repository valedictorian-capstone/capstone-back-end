import { AutoMap } from 'nestjsx-automapper';
import { json } from 'sequelize';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ProcessCondition } from './process-condition.model';
import { ProcessConnection } from './process-connection.model';
import { ProcessInstance } from './process-instance.model';
import { ProcessStep } from './process-step.model';

@Entity()
export class Process extends BaseEntity {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;

  @AutoMap()
  @Column({ default: null })
  public code: string;

  @OneToMany(() => ProcessInstance, processInstance => processInstance.process)
  public processInstances: ProcessInstance[];

  @OneToMany(() => ProcessStep, processStep => processStep.process)
  public processSteps: ProcessStep[];

  @OneToMany(() => ProcessCondition, processCondition => processCondition.process)
  public processConditions: ProcessCondition[];

  @OneToMany(() => ProcessConnection, processConnetion => processConnetion.process)
  public processConnections: ProcessConnection[]

  // @AutoMap()
  @Column("json", { default: null })
  public props: any;

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
