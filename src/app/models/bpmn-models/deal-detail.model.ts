import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Product } from '../product-models';

import { Deal } from './deal.model';


@Entity()
export class DealDetail extends BaseEntity {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  
  @AutoMap()
  @Column({ default: 1 })
  public quantity: number;

  @ManyToOne(() => Deal, deal => deal.dealDetails)
  public deal: Deal;

  @ManyToOne(() => Product, product => product.dealDetails)
  public product: Product;

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