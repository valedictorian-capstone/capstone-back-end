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
import { FormControl } from './form-control.models';

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

  @AutoMap(()=> WFStep)
  @ManyToMany(()=> WFStep, wFStep => wFStep.formGroups)
  @JoinTable()
  public wfSteps: WFStep[];

  @AutoMap()
  @OneToMany(() => FormControl, formControl => formControl.formGroup)
  public formControls: FormControl[]

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
