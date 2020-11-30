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
import { DealDetail } from '../bpmn-models';
import { Category } from './category.model';

@Entity()
export class Product extends BaseEntity {
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
  public type: string;

  @Column({ default: null })
  @AutoMap()
  public price: number;

  @Column({ default: null })
  @AutoMap()
  public description: string;

  @Column({ default: null })
  @AutoMap()
  public image: string;

  @Column("json", { default: null })
  public parameters: any;

  @ManyToOne(() => Category, category => category.products)
  public category: Category;

  @OneToMany(() => DealDetail, dealDetails => dealDetails.product)
  public dealDetails: DealDetail[];

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
