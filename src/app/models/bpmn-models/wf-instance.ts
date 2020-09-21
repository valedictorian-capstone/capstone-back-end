import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,

  Entity,

  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { WFStepInstance } from './wf-step-instance.model';
import { WF } from './wf.model';

@Entity()
export class WFInstance extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public Code: string;

  @AutoMap()
  @Column({ default: null })
  public note: string;

  // @AutoMap(() => WFStepInstance, 1)
  @OneToMany(
    () => WFStepInstance,
    wFStepInstances => wFStepInstances.wFInstance,
  )
  public wFStepInstances: WFStepInstance[];

  @AutoMap(() => WF, 1)
  public wf: WF;

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
