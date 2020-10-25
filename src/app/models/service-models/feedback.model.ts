import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../customer-models';
import { Order } from './order.model';

@Entity()
export class FeedBack extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => Customer, customer => customer.feedBacks)
    public customer: Customer;

    @ManyToOne(() => Order, order => order.feedBacks)
    public order: Order;


}