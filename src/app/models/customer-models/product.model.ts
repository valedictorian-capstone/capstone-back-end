import { ProductExtraValue } from '@models';
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

@Entity()
export class Product extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  
  @AutoMap()
  public name: string;

  @AutoMap()
  public brand: string;

  @AutoMap()
  public price: string;

  @AutoMap()
  public description: string;

  @OneToMany(() => ProductExtraValue, productExtraValues => productExtraValues.product )
  public productExtraValues: ProductExtraValue[];

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
