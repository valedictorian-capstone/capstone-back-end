import { hashSync } from 'bcrypt';
import { AutoMap } from 'nestjsx-automapper';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
  @Column({ nullable: false, default: '' })
  public fullname: string;

  @AutoMap()
  @Column({ nullable: false, unique: true, default: '' })
  public email: string;

  @AutoMap()
  @Column({ default: '' })
  public phone: string;

  @AutoMap()
  @Column({ default: '' })
  public code: string;

  @AutoMap()
  @Column({ default: '' })
  public avatar: string;

  @AutoMap()
  @Column({ default: '' })
  public address: string;

  @AutoMap()
  @Column({ default: '' })
  public gender: string;

  @AutoMap()
  @Column({ nullable: false, default: '1' })
  public password: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public deviceId: string;

  @OneToMany(() => AccountDepartment, accountDepartments => accountDepartments.account)
  public accountDepartments: AccountDepartment[];

  @OneToMany(() => Notification, notification => notification.account)
  public notifications: Notification[];

  @OneToMany(() => Comment, commments => commments.account)
  public comments: Comment[];

  @OneToMany(() => Task, task => task.assignee)
  public task: Task[];

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashSync(this.password, 10);
  }
}
