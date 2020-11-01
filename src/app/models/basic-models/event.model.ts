import { AutoMap } from 'nestjsx-automapper';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.model';

@Entity()
export class Event extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false })
    public name: string;

    @AutoMap()
    @Column({ nullable: false })
    public code: string;

    @AutoMap()
    @Column({ nullable: false })
    public description: string;

    @AutoMap()
    @Column({ nullable: false })
    public dateStart: Date;
    
    @AutoMap()
    @Column({ nullable: false })
    public dateEnd: Date;

    @ManyToMany(() => Group, groups => groups.events)
    public groups: Group[];

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