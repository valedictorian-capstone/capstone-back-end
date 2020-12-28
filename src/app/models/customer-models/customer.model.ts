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
  UpdateDateColumn
} from 'typeorm';
import { Comment, Device, Group, Notification } from '../basic-models';
import { Deal } from '../bpmn-models';
import { Ticket } from '../product-models';


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
  public email: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
  public phone: string;
  
  @AutoMap()
  @Column({ nullable: true })
  public birthDay: Date;

  @AutoMap()
  @Column({ nullable: true })
  public avatar: string;

  @AutoMap()
  @Column({ nullable: true })
  public gender: string;

  @AutoMap()
  @Column({ nullable: true })
  public type: string;

  @AutoMap()
  @Column({ nullable: true })
  public street: string;

  @AutoMap()
  @Column({ nullable: true })
  public city: string;

  @AutoMap()
  @Column({ nullable: true })
  public state: string;

  @AutoMap()
  @Column({ nullable: true })
  public country: string;
  
  @AutoMap()
  @Column({ nullable: true })
  public company: string;
  
  @AutoMap()
  @Column({ nullable: true })
  public fax: string;
  
  @AutoMap()
  @Column({ nullable: true })
  public website: string;
  
  @AutoMap()
  @Column({ nullable: true })
  public source: string;
  
  @AutoMap()
  @Column({ nullable: true })
  public skypeName: string;
  
  @AutoMap()
  @Column({ nullable: true })
  public facebook: string;
  
  @AutoMap()
  @Column({ nullable: true })
  public twitter: string;

  @AutoMap()
  @Column({ nullable: false, default: 0, type: 'float' })
  public totalDeal: number;

  @AutoMap()
  @Column({ nullable: false, default: 0, type: 'float' })
  public totalSpending: number;

  @AutoMap()
  @Column({ nullable: false, default: 0, type: 'float' })
  public frequency: number;

  @AutoMap()
  @Column({ nullable: true })
  public description: string;

  @ManyToMany(() => Group, group => group.customers)
  @JoinTable()
  public groups: Group[];

  @OneToMany(() => Deal, deals => deals.customer)
  public deals: Deal[];

  @OneToMany(() => Device, devices => devices.employee)
  public devices: Device[];

  @OneToMany(() => Ticket, tickets => tickets.customer)
  public tickets: Ticket[];

  @OneToMany(() => Notification, notifications => notifications.customer)
  public notifications: Notification[];

  @OneToMany(() => Comment, comments => comments.customer)
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
