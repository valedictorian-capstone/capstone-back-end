import { AutoMap } from 'nestjsx-automapper';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Comment, Notification } from '../basic-models';
import { Task } from '../bpmn-models';
import { AccountDepartment } from './account-department.model';
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

  @AutoMap()
  @Column({ nullable: true })
  public deviceId: string;

  @OneToMany(() => AccountDepartment, accountDepartments => accountDepartments.account)
  public accountDepartments: AccountDepartment[];

  @OneToMany(() => Notification, notification => notification.account)
  public notifications: Notification[];

  @OneToMany(() => Comment, commments => commments.account)
  public comments: Comment[];

  @OneToMany(() => Task, tasks => tasks.assignee)
  public tasks: Task[];

  @OneToMany(() => Task, task => task.assignBy)
  public assignTasks: Task[];

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
