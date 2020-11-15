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
import { Device, Group } from '../basic-models';
import { Deal } from '../bpmn-models';
import { Ticket } from '../service-models';

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
  public avatar: string;

  @AutoMap()
  @Column({ nullable: true })
  public gender: boolean;

  @AutoMap()
  @Column({ nullable: true })
  public type: string;

  @AutoMap()
  @Column({ nullable: true })
  public shortName: string;

  @AutoMap()
  @Column({ nullable: true })
  public province: string;

  @AutoMap()
  @Column({ nullable: true })
  public district: string;

  @AutoMap()
  @Column({ nullable: false, default: 0 })
  public totalDeal: number;

  @AutoMap()
  @Column({ nullable: false, default: 0 })
  public totalSpending: number;

  @AutoMap()
  @Column({ nullable: false, default: 0 })
  public frequency: number;

  @ManyToMany(() => Group, group => group.customers)
  @JoinTable()
  public groups: Group[];

  @OneToMany(() => Deal, deals => deals.customer)
  public deals: Deal[];

  @OneToMany(() => Device, devices => devices.account)
  public devices: Device[];

  @OneToMany(() => Ticket, tickets => tickets.customer)
  public tickets: Ticket[];

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
