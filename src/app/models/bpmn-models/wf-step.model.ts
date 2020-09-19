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
import { FormGroup } from '../form-models/form-group.models';
import { WFStepInstance } from './wf-step-instance.model';
import { WF } from './wf.model';

@Entity()
export class WFStep extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @AutoMap()
  @Column({ default: null })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public type: string;

  @AutoMap()
  @Column({ default: null })
  public subType: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;

  @AutoMap()
  @ManyToOne(() => WF, wF => wF.wFStep)
  public wF: WF;

  @AutoMap(() => WFStepInstance)
  @OneToMany(() => WFStep, wFStep => wFStep.wFStepsInstances)
  public wFStepsInstances: WFStepInstance[];

  @AutoMap(() => FormGroup)
  @ManyToMany(() => FormGroup, formGroup => formGroup.wfSteps)
  public formGroups: FormGroup[];

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
