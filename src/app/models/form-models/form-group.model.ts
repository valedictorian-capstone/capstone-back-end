import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { WFStep } from '../bpmn-models/wf-step.model';
import { FormControl } from './form-control.model';
import { FormData } from './form-data.model';

@Entity()
export class FormGroup extends BaseEntity {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;

  @AutoMap(() => WFStep, 1)
  @ManyToMany(() => WFStep, wFStep => wFStep.formGroups)
  @JoinTable()
  public wfSteps: WFStep[];

  @AutoMap(() => FormControl, 1)
  @OneToMany(() => FormControl, formControl => formControl.formGroup)
  public formControls: FormControl[]

  @AutoMap(() => FormData, 1)
  @OneToMany(() => FormData, formData => formData.formGroup)
  public formData: FormData[];

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
