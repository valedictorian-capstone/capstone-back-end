import { AutoMap } from 'nestjsx-automapper';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Customer } from '.';
import { ExtraInformation } from '../basic-models';

@Entity()
export class CustomerExtraInformationData extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: true })
    public value: string;

    @ManyToOne(() => ExtraInformation, ExtraInformation => ExtraInformation.customerExtraInformationDatas)
    public extraInformation: ExtraInformation;

    @ManyToOne(() => Customer, customer=> customer.customerExtraInformationDatas)
    public customer: Customer;

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