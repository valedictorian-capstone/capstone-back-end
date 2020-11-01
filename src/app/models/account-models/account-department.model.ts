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
    public isLeader: boolean;

    @AutoMap()
    @Column({ nullable: true })
    public description: string;  

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