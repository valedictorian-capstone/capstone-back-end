import { AutoMap } from 'nestjsx-automapper';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from 'typeorm';
import { Account } from '../account-models';
import { Customer } from '../customer-models';

@Entity()
export class Device extends BaseEntity {

  @AutoMap()
  public id: string;

  @AutoMap()
  @Column({ default: '' })
  public browser: string;

  @AutoMap()
  @Column({ default: '' })
  public browserVersion: string;

  @AutoMap()
  @Column({ default: '' })
  public device: string;

  @AutoMap()
  @Column({ default: '' })
  public os: string;

  @AutoMap()
  @Column({ default: '' })
  public osVersion: string;

  @AutoMap()
  @Column({ default: '' })
  public userAgent: string;

  @AutoMap()
  @Column({ default: 'desktop' })
  public env: string;

  @ManyToOne(() => Account, account => account.devices)
  public account: Account;

  @ManyToOne(() => Customer, customer => customer.devices)
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