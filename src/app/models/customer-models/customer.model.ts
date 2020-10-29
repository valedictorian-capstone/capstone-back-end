import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../basic-models';
import { WFInstance } from '../bpmn-models';
import { Task } from '../bpmn-models/task.model';
import { FeedBack, Order } from '../service-models';

@Entity()
export class Customer extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: false })
  public fullname: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
  public code: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
  public email: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
  public phone: string;

  @AutoMap()
  @Column({ nullable: true })
  public delegate: string;

  @AutoMap()
  @Column({ nullable: true })
  public birthDate: Date;

  @AutoMap()
  @Column({ nullable: true })
  public address: string;

  @AutoMap()
  @Column({ nullable: true })
  public avatar: string;

  @AutoMap()
  @Column({ nullable: true })
  public gender: boolean;

  @AutoMap()
  @Column({ nullable: true })
  public type: string;

  @ManyToMany(() => Group, group => group.customers)
  @JoinTable()
  public groups: Group[];

  @OneToMany(() => WFInstance, wFInstances => wFInstances.customer)
  public wFInstances: WFInstance[];

  @OneToMany(() => Task, task => task.customer)
  public tasks: Task[];

  @OneToMany(() => Order, orders => orders.customer)
  public orders: Order[];

  @OneToMany(() => FeedBack, feedBacks => feedBacks.customer)
  public feedBacks: FeedBack[];

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
