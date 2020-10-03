import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountExtraValue } from "./account-extra-value.model";

@Entity()
export class AccountExtraInformation extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false, default: '', unique: true })
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

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public placeHolder: string;

    @AutoMap()
    @Column({ nullable: false, default: '' })
    public tooltip: string;

    @OneToMany(() => AccountExtraValue, accountExtraValues => accountExtraValues.accountExtraInformation)
    public accountExtraValues: AccountExtraValue[];

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