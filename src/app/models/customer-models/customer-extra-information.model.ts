import { AutoMap } from 'nestjsx-automapper';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CustomerExtraInformationData } from './customer-extra-information-data.model'

@Entity()
export class CustomerExtraInformation extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false, unique: true })
    public name: string;

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public type: string;

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public subType: string;

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public options: string;

    @OneToMany(() => CustomerExtraInformationData, customerExtraInformationDatas => customerExtraInformationDatas.customerExtraInformation )
    public customerExtraInformationDatas: CustomerExtraInformationData[];

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public label: string;

    @AutoMap()
    @Column({ nullable: false, default: '' })
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