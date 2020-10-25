import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.model';

@Entity()
export class Service extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ default: null })
  @AutoMap()
  public code: string;
  
  @Column({ default: null })
  @AutoMap()
  public name: string;

  @Column({ default: null })
  @AutoMap()
  public brand: string;

  @Column({ default: null })
  @AutoMap()
  public price: string;

  @Column({ default: null })
  @AutoMap()
  public description: string;

  public orders: Order[];

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
