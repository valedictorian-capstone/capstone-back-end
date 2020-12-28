import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../employee-models";
import { Deal } from "./deal.model";

@Entity()
export class Activity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: false })
  public name: string;

  @AutoMap()
  @Column({ nullable: false })
  public type: string;

  @AutoMap()
  @Column({ default: null })
  public location: string;

  @AutoMap()
  @Column({ default: null, length: 10000 })
  public description: string;
  
  @ManyToOne(() => Employee, employee => employee)
  public assignee: Employee;

  @ManyToOne(() => Employee, employee => employee)
  public assignBy: Employee;

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