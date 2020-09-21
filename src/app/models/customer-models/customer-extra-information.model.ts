import { AutoMap } from 'nestjsx-automapper';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Customer } from './customer.model';
import { CustomerExtraInformationData } from './customer-extra-information-data.model'

@Entity()
export class CustomerExtraInformation extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false })
    public name: string;

    @AutoMap()
    @Column({ nullable: false })
    public type: string;

    @AutoMap()
    @Column({ nullable: false })
    public subType: string;

    @AutoMap()
    @Column({ nullable: false })
    public options: string;

    @AutoMap(() => Customer)
    @ManyToOne(() => Customer, customer => customer.customerExtraInformations)
    public customer: Customer;

    @AutoMap(() => CustomerExtraInformationData)
    @OneToMany(() => CustomerExtraInformationData, customerExtraInformationDatas => customerExtraInformationDatas.customerExtraInformation )
    public customerExtraInformationDatas: CustomerExtraInformationData[];


    @AutoMap()
    @Column({ nullable: false })
    public label: string;

    @AutoMap()
    @Column({ nullable: false })
    public toolTip: string;

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