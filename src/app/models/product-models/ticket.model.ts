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
    @Column({ default: null })
    public description: string;

    @AutoMap()
    @Column({ default: false })
    public status: boolean;

    @ManyToOne(() => Customer, customer => customer.tickets)
    public customer: Customer;
    
    @ManyToOne(() => Account, assignee => assignee.tickets)
    public assignee: Account;

    @AutoMap()
    @Column({ default: null })
    public feedbackMessage: string;

    @AutoMap()
    @Column({ default: 0 })
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