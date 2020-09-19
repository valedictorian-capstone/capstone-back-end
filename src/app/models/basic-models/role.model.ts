import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.model";
@Entity()
export class Role extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false, default:'jame'})
    public name: string;

    @AutoMap()
    @Column({default:null})
    public description: string;

    @AutoMap(() => Account)
    @ManyToMany(() => Account, account => account.Roles)
    public accounts: Account[];

    @AutoMap()
    @Column({ default: 'crm' })
    public createdBy: string;

    @AutoMap()
    @Column({ default: 'crm' })
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