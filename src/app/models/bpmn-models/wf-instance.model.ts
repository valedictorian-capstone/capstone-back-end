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
import { WFStepInstance } from './wf-step-instance.model';
import { Customer } from '../customer-models/customer.model';

@Entity()
export class WFInstance extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public Code: string;

  @AutoMap()
  @Column({ default: null })
  public note: string;

  @AutoMap()
  @OneToMany(() => WFStepInstance, wFStepInstances => wFStepInstances.wFInstance,
  )
  public wFStepInstances: WFStepInstance[];

  @AutoMap(() => Customer)
  @ManyToOne(() => Customer, customer => customer.wFInstances)
  public customer: Customer;

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
