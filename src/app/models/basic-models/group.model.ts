import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Campaign } from '../bpmn-models';
import { Customer } from '../customer-models';
import { Event } from './event.model';

@Entity()
export class Group extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @AutoMap()
  @Column({ nullable: false })
  public name: string;

  @AutoMap()
  @Column({ default: null })
  public description: string;

  @AutoMap()
  @Column({ default: null })
  public type: string;

  @ManyToMany(() => Customer, Customer => Customer.groups)
  public customers: Customer[];

  @ManyToMany(() => Event, events => events.groups)
  @JoinTable()
  public events: Event[];
  
  @ManyToMany(() => Campaign, campaigns => campaigns.groups)
  @JoinTable()
  public campaigns: Campaign[];

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
