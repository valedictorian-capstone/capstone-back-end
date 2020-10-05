import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { FormGroup } from './form-group.model';
import { FormValue } from './form-value.model';

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

  @ManyToOne(() => FormGroup, formGroup => formGroup.formControls)
  public formGroup: FormGroup;

  @OneToMany(() => FormValue, formValues => formValues.formControl)
  public formValues: FormValue[];

  @AutoMap()
  @Column({ default: null })
  public placeHolder: string;

  @AutoMap()
  @Column({ default: null })
  public fontSize: string;

  @AutoMap()
  @Column({ default: null })
  public size: string;

  @AutoMap()
  @Column({ default: null })
  public options: string;

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
  @Column({ default: null })
  public height: string;

  @AutoMap()
  @Column({ default: null })
  public isCapitialize: boolean;

  @AutoMap()
  @Column({ default: null })
  public toolTip: string;

  @AutoMap()
  @Column({ nullable: false, default: '' })
  public label: string;

  @AutoMap()
  @Column({ default: null })
  public color: string;

  @AutoMap()
  @Column({ default: null })
  public position: number;

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
