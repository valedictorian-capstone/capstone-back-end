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
import { Customer } from '../customer-models';
import { Event } from './event.model';
import { Trigger } from './trigger.model';

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
  
  @AutoMap()
  @Column({ default: null })
  public condition: string;

  @ManyToMany(() => Customer, Customer => Customer.groups)
  public customers: Customer[];

  @ManyToMany(() => Event, events => events.groups)
  @JoinTable()
  public events: Event[];

  @ManyToMany(() => Trigger, triggers => triggers.groups)
  @JoinTable()
  public triggers: Trigger[];

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
