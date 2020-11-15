import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "../account-models";
import { Deal } from "./deal.model";
import { Stage } from "./stage.model";

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

  @ManyToOne(() => Deal, deal => deal.activitys)
  public deal: Deal;

  @AutoMap()
  @Column({ default: "processing" })
  public status: string;

  @AutoMap()
  @Column({ default: null })
  public dateStart: Date;

  @AutoMap()
  @Column({ default: null })
  public dateEnd: Date;

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