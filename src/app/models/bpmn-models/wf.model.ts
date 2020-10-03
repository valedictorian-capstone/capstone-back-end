import { AutoMap } from 'nestjsx-automapper';
import { json } from 'sequelize';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { WFCondition } from './wf-condition.model';
import { WFConnection } from './wf-connection.model';
import { WFInstance } from './wf-instance.model';
import { WFStep } from './wf-step.model';

@Entity()
export class WF extends BaseEntity {

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
  public code: string;

  @OneToMany(() => WFInstance, wFInstance => wFInstance.wf)
  public wFInstances: WFInstance[];

  @OneToMany(() => WFStep, wFStep => wFStep.wF)
  public wFSteps: WFStep[];

  @OneToMany(() => WFCondition, wFCondition => wFCondition.wF)
  public wFConditions: WFCondition[];

  @OneToMany(() => WFConnection, wfConnetion => wfConnetion.wf)
  public wfConnections: WFConnection[]

  // @AutoMap()
  @Column("json",{default:null})
  public style: any;

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
