import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "../account-models";

@Entity()
export class Notification extends BaseEntity {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column("json", { default: null })
  public notification: any;

  @AutoMap()
  @Column({ default: '' })
  public type: string;

  @AutoMap()
  @Column("json", { default: null })
  public data: any;

  @AutoMap()
  @Column({ default: false })
  public isSeen: boolean;

  @ManyToOne(() => Account, account => account.notifications)
  public account: Account;

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
  @CreateDateColumn()
  public updatedAt: Date;
}
