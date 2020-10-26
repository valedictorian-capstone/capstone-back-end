import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account.model";

@Entity()
export class Role extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public name: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public description: string;

  @ManyToMany(() => Account, account => account.roles)
  public accounts: Account[];

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