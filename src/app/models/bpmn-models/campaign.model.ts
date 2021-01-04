import { AutoMap } from 'nestjsx-automapper';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Group } from '../basic-models';
import { Activity } from './activity.model';
import { Attachment } from './attachment.model';
import { Log } from './log.model';
import { Note } from './note.model';

@Entity()
export class Campaign extends BaseEntity {

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
    public type: string;

    @AutoMap()
    @Column({ nullable: false })
    public dateStart: Date;
  
    @AutoMap()
    @Column({ nullable: false })
    public dateEnd: Date;

    @ManyToMany(() => Group, groups => groups.campaigns)
    public groups: Group[];

    @OneToMany(() => Log, log => log.campaign)
    public logs: Log[];

    @OneToMany(() => Note, notes => notes.campaign)
    public notes: Note[];

    @OneToMany(() => Attachment, attachments => attachments.campaign)
    public attachments: Attachment[];

    @OneToMany(() => Activity, activitys => activitys.campaign)
    public activitys: Activity[];

    @AutoMap()
    @Column({ default: null })
    public emailTemplate: string;

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