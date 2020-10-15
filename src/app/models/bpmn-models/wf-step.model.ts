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
import { FormGroup } from '../form-models';
import { WFConnection } from './wf-connection.model';


import { WFStepInstance } from './wf-step-instance.model';
import { WF } from './wf.model';

@Entity()
export class WFStep extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public type: string;

  @AutoMap()
  @Column({ default: null })
  public shape: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;

  @ManyToOne(() => WF, wF => wF.wFSteps)
  public wF: WF;

  @OneToMany(() => WFStep, wFStep => wFStep.wFStepsInstances)
  public wFStepsInstances: WFStepInstance[];

  @OneToMany(() => WFConnection, wfConnection => wfConnection.fromWFStep)
  public wfFromConnections: WFConnection[]

  @OneToMany(() => WFConnection, wfConnection => wfConnection.toWFStep)
  public wfToConnections: WFConnection[]

  @Column("json")
  public props: any

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
