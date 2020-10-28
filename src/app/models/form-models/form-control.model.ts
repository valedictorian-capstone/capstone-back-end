
import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FormGroup } from './form-group.model';

@Entity()
export class FormControl extends BaseEntity {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;

  @AutoMap()
  @Column({ default: null })
  public placeHolder: string;

  @AutoMap()
  @Column({ default: null })
  public fontSize: string;

  @AutoMap()
  @Column({ default: null })
  public size: string;

  @Column("json", { default: null })
  public options: any;

  @Column("json", { default: null })
  public validator: any;

  @AutoMap()
  @Column({ default: null })
  public type: string;

  @AutoMap()
  @Column({ default: null })
  public subType: string;

  @AutoMap()
  @Column({ default: null })
  public width: string;

  @AutoMap()
  @Column({ default: 24 })
  public xs: number;

  @AutoMap()
  @Column({ default: 24 })
  public sm: number;

  @AutoMap()
  @Column({ default: 24 })
  public md: number;

  @AutoMap()
  @Column({ default: 24 })
  public lg: number;

  @AutoMap()
  @Column({ default: 24 })
  public xl: number;

  @AutoMap()
  @Column({ default: 24 })
  public xxl: number;

  @AutoMap()
  @Column({ default: null })
  public height: string;

  @AutoMap()
  @Column({ default: null })
  public isCapitialize: boolean;

  @AutoMap()
  @Column({ default: null })
  public tooltip: string;

  @AutoMap()
  @Column({ default: '' })
  public label: string;

  @AutoMap()
  @Column({ default: null })
  public color: string;
  
  @AutoMap()
  @Column({ default: null })
  public position: number;
  
  @ManyToOne(() => FormGroup, formGroup => formGroup.formControls)
  public formGroup: FormGroup;

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
