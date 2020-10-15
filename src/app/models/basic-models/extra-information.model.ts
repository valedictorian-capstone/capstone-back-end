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
import { AccountExtraInformationData } from '../account-models';
import { CustomerExtraInformationData } from '../customer-models';
import { ProductExtraInformationData } from '../product-models';

@Entity()
export class ExtraInformation extends BaseEntity {

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
    public placeHolder: string;

    @AutoMap()
    @Column({ default: null })
    public fontSize: string;

    @AutoMap()
    @Column({ default: null })
    public size: string;

    @Column("json", { default: null })
    public options: any;

    @AutoMap()
    @Column({ default: null })
    public type: string;

    @AutoMap()
    @Column({ default: null })
    public subType: string;

    @AutoMap()
    @Column({ default: null })
    public width: string;

    @AutoMap()
    @Column({ default: 24 })
    public xs: number;

    @AutoMap()
    @Column({ default: 24 })
    public sm: number;

    @AutoMap()
    @Column({ default: 24 })
    public md: number;

    @AutoMap()
    @Column({ default: 24 })
    public lg: number;

    @AutoMap()
    @Column({ default: 24 })
    public xl: number;

    @AutoMap()
    @Column({ default: 24 })
    public xxl: number;

    @AutoMap()
    @Column({ default: null })
    public height: string;

    @AutoMap()
    @Column({ default: null })
    public isCapitialize: boolean;

    @AutoMap()
    @Column({ default: null })
    public tooltip: string;

    @AutoMap()
    @Column({ default: '' })
    public label: string;

    @AutoMap()
    @Column({ default: null })
    public color: string;

    @AutoMap()
    @Column({ default: null })
    public position: number;

    @AutoMap()
    @Column({ default: null})
    public state: string;

    @OneToMany(() => CustomerExtraInformationData, customerExtraInformationDatas => customerExtraInformationDatas.extraInformation)
    public customerExtraInformationDatas: CustomerExtraInformationData[];

    @OneToMany(() => ProductExtraInformationData, productExtraInformationDatas => productExtraInformationDatas.extraInformation)
    public productExtraInformationDatas: ProductExtraInformationData[];

    @OneToMany(() => AccountExtraInformationData, accountExtraInformationDatas => accountExtraInformationDatas.extraInformation)
    public accountExtraInformationDatas: AccountExtraInformationData[];

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