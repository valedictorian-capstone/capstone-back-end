import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "../basic-models";
import { Account } from "./account.model";

@Entity()
export class AccountDepartment extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ManyToOne(() => Account, account => account.accountDepartments)
    public account: Account;

    @ManyToOne(() => Department, department => department.accountDepartments)
    public department: Department;

    @AutoMap()
    @Column({ default: false })
    public isModerator: boolean;

    @AutoMap()
    @Column({ default: false })
    public isSystemAdmin: boolean;

    @AutoMap()
    @Column({ default: true })
    public isEmployee: boolean;

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