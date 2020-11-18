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
import { Stage } from './stage.model';

@Entity()
export class Pipeline extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ default: null })
    public name: string;

    @OneToMany(() => Stage, stages => stages.pipeline)
    public stages: Stage[];

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