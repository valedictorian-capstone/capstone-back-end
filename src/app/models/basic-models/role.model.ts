import { AutoMap } from "nestjsx-automapper";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.model";
@Entity()
export class Role extends BaseEntity {

    @AutoMap()
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @AutoMap()
    @Column({ nullable: false })
    public name: string;

    @AutoMap()
    @Column({ length: 500 })
    public description: string;

    @AutoMap(() => Account)
    @ManyToMany(() => Account, account => account.Roles)
    public accounts: Account[];

    @AutoMap()
    @Column({ default: 'crm' })
    public areatedBy: string;

    @AutoMap()
    @Column({ default: 'crm' })
    public apdatedBy: string;

    @AutoMap()
    @Column({ default: false })
    public asDelete: boolean;

    @AutoMap()
    @CreateDateColumn()
    public createdAt: Date;

    @AutoMap()
    @UpdateDateColumn()
    public updatedAt: Date;
}