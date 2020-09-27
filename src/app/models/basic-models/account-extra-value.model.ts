import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountExtraInformation } from "./account-extra-information.model";
import { Account } from "./account.model";

@Entity()
export class AccountExtraValue extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public value: string;

    @ManyToOne(() => AccountExtraInformation, accountExtraInformation => accountExtraInformation.accountExtraValues)
    public accountExtraInformation: AccountExtraInformation;

    @ManyToOne(() => Account, account => account.accountExtraValues)
    public account: Account;

    @AutoMap()
    @Column({ default: 'admin' })
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
    @CreateDateColumn()
    public updatedAt: Date;

}