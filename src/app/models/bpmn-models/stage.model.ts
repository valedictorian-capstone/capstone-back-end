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
import { Deal } from './deal.model';
import { Pipeline } from './pipeline.model';

@Entity()
export class Stage extends BaseEntity {

  @AutoMap()
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
  public subType: string;

  @AutoMap()
  @Column({ default: null })
  public progress: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;
  
  @AutoMap()
  @Column({ default: 1 })
  public position: number;

  @OneToMany(() => Deal, deals => deals.stage)
  public deals: Deal[];

  @ManyToOne(() => Pipeline, pipeline => pipeline.stages)
  public pipeline: Pipeline;

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
