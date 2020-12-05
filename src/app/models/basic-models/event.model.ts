import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.model';
import { Trigger } from './trigger.model';

@Entity()
export class Event extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false })
    public name: string;
    
    @AutoMap()
    @Column({ nullable: false, length: 10000 })
    public description: string;

    @AutoMap()
    @Column({ nullable: false })
    public dateStart: Date;
    
    @AutoMap()
    @Column({ nullable: false })
    public dateEnd: Date;

    @ManyToMany(() => Group, groups => groups.events)
    public groups: Group[];

    @OneToMany(() => Trigger, triggers => triggers.event )
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