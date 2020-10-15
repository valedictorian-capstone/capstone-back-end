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
import { ExtraInformation } from '../basic-models';
import { Account } from './account.model';

@Entity()
export class AccountExtraInformationData extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: true })
    public value: string;

    @ManyToOne(() => ExtraInformation, extraInformation => extraInformation.accountExtraInformationDatas)
    public extraInformation: ExtraInformation;

    @ManyToOne(() => Account, account=> account.accountExtraInformationDatas)
    public account: Account;

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