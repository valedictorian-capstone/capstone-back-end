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
import { ProductExtraInformationData } from './product-extra-information-data.model';

@Entity()
export class Product extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  
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

  @OneToMany(() => ProductExtraInformationData, productExtraInformationDatas => productExtraInformationDatas.product )
  public productExtraInformationDatas: ProductExtraInformationData[];

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
