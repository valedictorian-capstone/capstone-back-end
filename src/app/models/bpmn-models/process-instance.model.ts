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
import { Customer } from '../customer-models/customer.model';
import { ProcessStepInstance } from './process-step-instance.model';
import { Process } from './process.model';

@Entity()
export class ProcessInstance extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public Code: string;

  @AutoMap()
  @Column({ default: null })
  public note: string;

  // @AutoMap(() => ProcessStepInstance, 1)
  @OneToMany(
    () => ProcessStepInstance,
    processStepInstances => processStepInstances.processInstance,
  )
  public processStepInstances: ProcessStepInstance[];

  @AutoMap(() => Customer, 1)
  @ManyToOne(() => Customer, customer => customer.processInstances)
  public customer: Customer;

  @AutoMap(() => Process, 1)
  public process: Process;

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
