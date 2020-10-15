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
import { ExtraInformation } from '../basic-models';
import { Product } from './product.model';

@Entity()
export class ProductExtraInformationData extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  
  @AutoMap()
  public value: string;

  @ManyToOne(() => Product, product => product.productExtraInformationDatas)
  public product: Product;

  @ManyToOne(() => ExtraInformation, extraInformation => extraInformation.productExtraInformationDatas)
  public extraInformation: ExtraInformation;

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
