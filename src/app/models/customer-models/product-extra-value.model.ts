import { Product, ProductExtraInformation } from '@models';
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

@Entity()
export class ProductExtraValue extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  
  @AutoMap()
  public value: string;

  @ManyToOne(() => Product, product => product.productExtraValues)
  public product: Product;

  @ManyToOne(() => ProductExtraInformation, productExtraInformation => productExtraInformation.productExtraValues)
  public productExtraInformation: ProductExtraInformation;

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
