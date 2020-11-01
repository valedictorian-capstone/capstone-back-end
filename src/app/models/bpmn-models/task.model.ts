import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "../account-models";
import { Customer } from "../customer-models/customer.model";
import { ProcessStepInstance } from "./process-step-instance.model";
import { ProcessStep } from "./process-step.model";

@Entity()
export class Task extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ unique: true, default: '' })
  public code: string;

  @ManyToOne(() => Account, account => account)
  public assignee: Account;

  @ManyToOne(() => ProcessStepInstance, processStepInstance => processStepInstance.tasks)
  public processStepInstance: ProcessStepInstance;

  @ManyToOne(() => Customer, customer => customer.tasks)
  public customer: Customer;

  @ManyToOne(() => Account, account => account)
  public assignBy: Account;

  @ManyToOne(() => ProcessStep, processStep => processStep.tasks)
  public processStep: ProcessStep;

  @AutoMap()
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