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
import { CustomerExtraInformation } from './customer-extra-information.model';
import { CustomerExtraData } from './customer-extra-data.model';

@Entity()
export class CustomerExtraInformationData extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false, unique: true })
    public value: string;

    @AutoMap()
    @ManyToOne(() => CustomerExtraInformation, customerExtraInformation => customerExtraInformation.customerExtraInformationDatas)
    public customerExtraInformation: CustomerExtraInformation;

    @AutoMap(() => CustomerExtraData)
    @ManyToOne(() => CustomerExtraData, customerExtraData=> customerExtraData.customerExtraInformationDatas)
    public customerExtraData: CustomerExtraData;

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