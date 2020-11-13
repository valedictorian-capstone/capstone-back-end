import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "../account-models";
import { ProcessInstance } from "./process-instance.model";

@Entity()
export class Activity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: false })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;
  
  @ManyToOne(() => Account, account => account)
  public assignee: Account;

  @ManyToOne(() => Account, account => account)
  public assignBy: Account;

  @ManyToOne(() => ProcessInstance, processInstance => processInstance.activitys)
  public processInstance: ProcessInstance;

  @AutoMap()
  @Column({ default: "processing" })
  public status: string;

  @AutoMap()
  @Column({ default: null })
  public deadline: Date;

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