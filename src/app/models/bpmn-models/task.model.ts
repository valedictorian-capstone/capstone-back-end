import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "../account-models";
import { WFStepInstance } from "./wf-step-instance.model";
import { Customer } from "../customer-models/customer.model";

@Entity()
export class Task extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => Account, account => account)
  public assignee: Account;

  @ManyToOne(() => WFStepInstance, wfStepInstance => wfStepInstance.tasks)
  public wfStepInstance: WFStepInstance;

  @ManyToMany(() => Customer, customer => customer.tasks)
  public customers: Customer[];

  @OneToOne(() => Account, account => account)
  public assignBy: Account;

  @Column({ default: "OPEN" })
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