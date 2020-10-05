import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "../basic-models/account.model";
import { WFStepInstance } from "../bpmn-models/wf-step-instance.model";
import { Customer } from "../customer-models/customer.model";

@Entity()
export class Task extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => Account, account => account)
  public assignee: Account;

  public wfStepInstance: WFStepInstance;

  public customer: Customer;

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