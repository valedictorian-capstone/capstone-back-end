import {
  BaseEntity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { WFStep } from './wf-step.model';


export class WF extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @OneToMany(() => WFStep, wFStep => wFStep.wF)
  public wFStep: WFStep[];

  @Column()
  public createdBy: string;

  @Column()
  public updatedBy: string;

  @Column({ default: false })
  public isDelete: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
