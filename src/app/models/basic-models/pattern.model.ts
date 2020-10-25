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
import { FormControl } from '../form-models/form-control.model';

@Entity()
export class Pattern extends BaseEntity {

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
    public value: string;

    @AutoMap()
    @Column( 'simple-json' )
    public enum: any[];

    @AutoMap()
    @Column({ default: null })
    public len: number;

    @AutoMap()
    @Column({ default: null })
    public max: number;

    @AutoMap()
    @Column({ default: null })
    public message: string;

    @AutoMap()
    @Column({ default: null })
    public min: number;

    @AutoMap()
    @Column({ default: null })
    public pattern: string;

    @AutoMap()
    @Column({ default: null })
    public required: boolean;

    @AutoMap()
    @Column({ default: null })
    public type: string;

    @AutoMap()
    @Column({ default: null })
    public whitespace: boolean;

    @AutoMap()
    @Column({ default: null })
    public validateTrigger: string;

    @AutoMap()
    @Column({ default: false })
    public isUnique: boolean;

    @ManyToMany(() => FormControl, formControls => formControls.patterns)
    @JoinTable()
    public formControls: FormControl[];

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