import { Department } from '@models';
import { hashSync } from 'bcrypt';
import { AutoMap } from 'nestjsx-automapper';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from '../task-models/task.model';
import { AccountExtraValue } from './account-extra-value.model';
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
  public position: string;

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

  @ManyToMany(() => Role, Role => Role.accounts)
  @JoinTable()
  public roles: Role[];

  @ManyToMany(() => Department, Department => Department.accounts)
  @JoinTable()
  public departments: Department[];

  @OneToMany(() => AccountExtraValue, accountExtraValues => accountExtraValues.account)
  public accountExtraValues: AccountExtraValue[];

  @OneToMany(() => Task, task => task.assignee) 
  public tasks: Task[]

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
