import { AutoMap } from 'nestjsx-automapper';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Device, Notification } from '../basic-models';
import { Activity } from '../bpmn-models';
import { Role } from './role.model';
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
  @Column({ nullable: true })
  public address: string;

  @AutoMap()
  @Column({ nullable: true, default: true })
  public gender: boolean;

  @AutoMap()
  @Column({ nullable: false, default: '1' })
  public password: string;

  @OneToMany(() => Device, devices => devices.account)
  public devices: Device[];

  @OneToMany(() => Notification, notification => notification.account)
  public notifications: Notification[];

  @OneToMany(() => Activity, activitys => activitys.assignee)
  public activitys: Activity[];

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
