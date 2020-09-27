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
import { CustomerExtraInformation } from './customer-extra-information.model';
import { Customer } from './customer.model';

@Entity()
export class CustomerExtraInformationData extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false, unique: true })
    public value: string;

    @ManyToOne(() => CustomerExtraInformation, customerExtraInformation => customerExtraInformation.customerExtraInformationDatas)
    public customerExtraInformation: CustomerExtraInformation;

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