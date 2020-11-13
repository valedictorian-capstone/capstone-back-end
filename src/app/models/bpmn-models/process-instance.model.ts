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
import { Activity } from '.';
import { Customer } from '../customer-models/customer.model';
import { Process } from './process.model';

@Entity()
export class ProcessInstance extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public code: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;

  @AutoMap(() => Customer, 1)
  @ManyToOne(() => Customer, customer => customer.processInstances)
  public customer: Customer;

  @AutoMap(() => Process, 1)
  @ManyToOne(() => Process, process => process.processInstances)
  public process: Process;

  @OneToMany(() => Activity, activity => activity.processInstance)
  public activitys: Activity[];
  
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