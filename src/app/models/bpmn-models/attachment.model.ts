import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Campaign } from './campaign.model';

import { Deal } from './deal.model';

@Entity()
export class Attachment extends BaseEntity {

  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ default: null })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public extension: string;

  @AutoMap()
  @Column({ default: null })
  public url: string;
  
  @AutoMap()
  @Column({ default: null })
  public size: number;

  @ManyToOne(() => Deal, deal => deal.attachments)
  public deal: Deal;

  @ManyToOne(() => Campaign, campaign => campaign.attachments)
  public campaign: Campaign;

  @AutoMap()
  @Column({ length: 1000, default: null })
  public description: string;

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