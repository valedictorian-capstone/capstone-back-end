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
export class ProductExtraInformation extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
  public name: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public type: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public subType: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public options: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public placeHolder: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public toolTip: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public label: string;

  @OneToMany(() => ProductExtraValue, productExtraValues => productExtraValues.productExtraInformation)
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
