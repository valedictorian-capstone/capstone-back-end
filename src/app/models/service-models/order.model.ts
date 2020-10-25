import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../customer-models';
import { FeedBack } from './feedback.model';
import { Service } from './service.model';

@Entity()
export class Order extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => Customer, customer => customer.orders)
    public customer: Customer;

    @ManyToOne(() => Service, service => service.orders)
    public service: Service;

    @OneToMany(() => FeedBack, feedBacks => feedBacks.order)
    public feedBacks: FeedBack[];

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