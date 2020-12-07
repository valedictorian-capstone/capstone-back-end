import { AutoMap } from 'nestjsx-automapper';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Device, Notification } from '../basic-models';
import { Activity, Deal } from '../bpmn-models';
import { Ticket } from '../product-models';
import { Role } from './role.model';
import { Customer } from '@models';
@Entity()
export class Account extends BaseEntity {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: true, default: '' })
  public fullname: string;

  @AutoMap()
  @Column({ nullable: false, unique: true, default: '' })
  public email: string;

  @AutoMap()
  @Column({ nullable: false, unique: true, default: '' })
  public phone: string;

  @AutoMap()
  @Column({ nullable: true, unique: true, default: '' })
  public code: string;

  @AutoMap()
  @Column({ nullable: true })
  public avatar: string;

  @AutoMap()
  @Column({ nullable: false, default: '1' })
  public passwordHash: string;

  @OneToMany(() => Device, devices => devices.account)
  public devices: Device[];

  @OneToMany(() => Notification, notification => notification.account)
  public notifications: Notification[];

  @OneToMany(() => Activity, activitys => activitys.assignee)
  public activitys: Activity[];

  @OneToMany(() => Ticket, tickets => tickets.assignee)
  public tickets: Ticket[];

  @OneToMany(() => Customer, customers => customers.assignee)
  public customers: Customer[];

  @OneToMany(() => Ticket, tickets => tickets.feedbackAssignee)
  public feedbackTickets: Ticket[];

  @OneToMany(() => Deal, deals => deals.assignee)
  public deals: Deal[];

  @JoinTable()
  @ManyToMany(() => Role, role => role.accounts)
  public roles: Role[]

  @AutoMap()
  @Column({ default: 'admin' })
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
