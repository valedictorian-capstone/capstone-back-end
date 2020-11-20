import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Account } from '../account-models';
import { Customer } from '../customer-models/customer.model';
import { Activity } from './activity.model';
import { DealDetail } from './deal-detail.model';
import { Note } from './note.model';
import { Stage } from './stage.model'

@Entity()
export class Deal extends BaseEntity {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public title: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;

  @AutoMap()
  @Column({ default: null })
  public status: string;

  @AutoMap()
  @Column({ default: 1 })
  public currentStep: number;

  @ManyToOne(() => Stage, stage => stage.deals)
  public stage: Stage;

  @ManyToOne(() => Customer, customer => customer.deals)
  public customer: Customer;

  @AutoMap()
  @Column({ default: null })
  public feedbackMessage: string;

  @AutoMap()
  @Column({ default: 1 })
  public feedbackRating: number;

  @AutoMap()
  @Column({ default: false })
  public feedbackStatus: boolean;

  @ManyToOne(() => Account, feedbackAssignee => feedbackAssignee.deals)
  public feedbackAssignee: Account;

  @OneToMany(() => Activity, activitys => activitys.deal)
  public activitys: Activity[];

  @OneToMany(() => DealDetail, dealDetails => dealDetails.deal)
  public dealDetails: DealDetail[];

  @OneToMany(() => Note, notes => notes.deal)
  public notes: Note[];
  
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