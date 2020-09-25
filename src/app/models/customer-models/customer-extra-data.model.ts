import { AutoMap } from 'nestjsx-automapper';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.model'
import { CustomerExtraInformationData } from './customer-extra-information-data.model'
@Entity()
export class CustomerExtraData extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => Customer, customer => customer.customerExtraDatas)
    public customer: Customer;

    @OneToMany(()=> CustomerExtraInformationData, customerExtraInformationDatas => customerExtraInformationDatas.customerExtraData)
    public customerExtraInformationDatas: CustomerExtraInformationData[];

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