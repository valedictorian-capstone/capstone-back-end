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
import { FormControl } from './form-control.model';
import { FormData } from './form-data.model';
@Entity()
export class FormValue extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap(() => FormData)
    @ManyToOne(() => FormData, formData => formData.formValues)
    public formData: FormData;

    @AutoMap(() => FormControl)
    @ManyToOne(() => FormControl, formControl =>formControl.formValues)
    public formControl: FormControl;

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