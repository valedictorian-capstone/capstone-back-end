import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../account-models';
import { Customer } from '../customer-models/customer.model';

@Entity()
export class Ticket extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ default: null, length: 1000 })
    public note: string;

    @AutoMap()
    @Column({ default: null, length: 500 })
    public description: string;

    @AutoMap()
    @Column({ default: 'waiting' })
    public status: string;
  
    @AutoMap()
    @Column({ default: 0 })
    public ability: number;

    @ManyToOne(() => Customer, customer => customer.tickets)
    public customer: Customer;
    
    @ManyToOne(() => Account, assignee => assignee.tickets)
    public assignee: Account;

    @AutoMap()
    @Column({ default: null })
    public type: string;

    @AutoMap()
    @Column({ default: null })
    public feedbackMessage: string;

    @AutoMap()
    @Column({ default: 1 })
    public feedbackRating: number;

    @AutoMap()
    @Column({ default: false })
    public feedbackStatus: boolean;

    @ManyToOne(() => Account, assignee => assignee.feedbackTickets)
    public feedbackAssignee: Account;

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