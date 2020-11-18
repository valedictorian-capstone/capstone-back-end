import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DealDetail } from '../bpmn-models';

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

  @Column("json", { default: null })
  public parameters: any;

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
